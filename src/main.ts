#!/usr/bin/env node

/**
 * Woffu check-in script
 * - Fetches diaries summary presence for a date range
 * - Skips weekends, holidays, and days with absenceEvents
 * - Computes slots using each day's schedule from the API
 * - PUTs workday slots to update the diary
 *
 * Env vars:
 * - WOFFU_BASE_URL: Base URL for the API (e.g. https://app.woffu.com)
 * - WOFFU_AUTH: Value for Authorization header (e.g. Bearer <token>) OR
 * - WOFFU_COOKIE: Raw Cookie header value if using cookie auth
 *
 * CLI args:
 * --user <id>          User ID (auto-detected from token if omitted)
 * --from <YYYY-MM-DD>  Start date (inclusive)
 * --to <YYYY-MM-DD>    End date (inclusive)
 * --catch-up           Auto-fill last 3 months up to yesterday
 * --dry-run            Preview without submitting
 */

import type { CliArgs, Diary } from './types.js';
import { fetchCurrentUserId, fetchDiaries, fetchExistingSlots, putSlots } from './api.js';
import { getConfig, loadEnv } from './env.js';
import * as log from './log.js';
import { computeSlotsForDay, parseBreakMinutes, parseFormattedMinutes } from './slots.js';

function toDateStr(d: Date): string {
	return d.toISOString().slice(0, 10);
}

function parseArgs(argv: string[]): CliArgs {
	const args: { user: number | null; from: string | null; to: string | null; dryRun: boolean; catchUp: boolean; lastWeek: boolean } = {
		user: null,
		from: null,
		to: null,
		dryRun: false,
		catchUp: false,
		lastWeek: false,
	};

	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];

		if (a === '--user') args.user = Number(argv[++i]);
		else if (a === '--from') args.from = argv[++i];
		else if (a === '--to') args.to = argv[++i];
		else if (a === '--dry-run') args.dryRun = true;
		else if (a === '--catch-up') args.catchUp = true;
		else if (a === '--last-week') args.lastWeek = true;
		else if (a === '--help' || a === '-h') {
			console.log([
				'Usage: woffu-checkin [options]',
				'',
				'Options:',
				'  --user <id>          User ID (auto-detected from token if omitted)',
				'  --catch-up           Auto-fill last 3 months up to yesterday',
				'  --last-week          Auto-fill last week (Mon–Sun)',
				'  --from <YYYY-MM-DD>  Start date (inclusive)',
				'  --to <YYYY-MM-DD>    End date (inclusive)',
				'  --dry-run            Preview without submitting',
				'  --help               Show this help',
			].join('\n'));
			process.exit(0);
		}
	}

	if (args.lastWeek) {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);

		const sevenDaysAgo = new Date(yesterday);
		sevenDaysAgo.setDate(yesterday.getDate() - 6);

		args.from = toDateStr(sevenDaysAgo);
		args.to = toDateStr(yesterday);
	} else if (args.catchUp) {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);

		const threeMonthsAgo = new Date(yesterday);
		threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

		args.from = args.from || toDateStr(threeMonthsAgo);
		args.to = args.to || toDateStr(yesterday);
	}

	if (!args.from || !args.to) {
		log.configError('Missing --from/--to (or use --catch-up / --last-week)');
		process.exit(1);
	}

	return args as CliArgs;
}

type DayStatus =
	| { action: 'checkin' }
	| { action: 'skip'; reason: string }
	| { action: 'pending-approval' };

function getDayStatus(day: Diary): DayStatus {
	if (day.isToday) {
		return { action: 'skip', reason: 'today (still working)' };
	}

	if (day.isWeekend || day.isHoliday) {
		return { action: 'skip', reason: 'weekend/holiday' };
	}

	if (day.absenceEvents && day.absenceEvents.length) {
		return { action: 'skip', reason: 'absence' };
	}

	const workedMinutes = parseFormattedMinutes(day.workedTimeFormatted);

	if (workedMinutes > 0) {
		const h = Math.floor(workedMinutes / 60);
		const m = workedMinutes % 60;

		return { action: 'skip', reason: `already worked ${h}h ${m}m` };
	}

	return { action: 'checkin' };
}

async function main(): Promise<void> {
	loadEnv();

	const config = getConfig();

	if (!config.baseUrl) {
		log.configError('Missing WOFFU_BASE_URL environment variable');
		process.exit(1);
	}

	if (!config.auth && !config.cookie) {
		log.configError('Missing authentication: set WOFFU_AUTH or WOFFU_COOKIE');
		process.exit(1);
	}

	const args = parseArgs(process.argv);

	if (!args.user) {
		args.user = await fetchCurrentUserId(config);
	}

	log.header(args.from, args.to, args.user, args.dryRun);

	const data = await fetchDiaries(config, args.user, args.from, args.to);
	const days = data?.diaries || [];

	let checked = 0;
	let skipped = 0;
	let pending = 0;
	let errors = 0;

	for (const d of days) {
		const status = getDayStatus(d);

		if (status.action === 'skip') {
			log.skipDay(d.date, status.reason);
			skipped++;
			continue;
		}

		if (status.action === 'pending-approval') {
			log.pendingApprovalDay(d.date);
			pending++;
			continue;
		}

		const hasSlots = await fetchExistingSlots(config, d.diarySummaryId);

		if (hasSlots) {
			log.pendingApprovalDay(d.date);
			pending++;
			continue;
		}

		const breakMinutes = parseBreakMinutes(d.breaks);
		const startTime = d.in || '09:00:00';

		const body = computeSlotsForDay({
			date: d.date,
			userId: args.user!,
			diaryId: d.diaryId,
			differenceTime: d.differenceTime,
			startTime,
			lunchMinutes: breakMinutes,
		});

		const lastOut = body.slots[body.slots.length - 1].out.time;

		if (args.dryRun) {
			log.preparedDay(d.date, startTime, lastOut, d.differenceTime);
			checked++;
			continue;
		}

		const result = await putSlots(config, d.diaryId, body);

		if (result.success) {
			log.successDay(d.date, startTime, lastOut);
			checked++;
		} else if (result.message === '_DuplicateSign') {
			log.pendingApprovalDay(d.date);
			pending++;
		} else {
			log.errorDay(d.date, result.message ?? 'unknown error');
			errors++;
		}
	}

	log.summary(days.length, checked, skipped, pending, errors);
}

await main().catch((e) => {
	log.configError((e as Error).message);
	process.exit(1);
});
