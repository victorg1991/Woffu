import { ref, type Ref } from 'vue';
import type { DayInfo } from '../types';
import { fetchDiaries, fetchExistingSlots, putSlots } from './useApi';
import { getDayStatus } from '../utils/dayStatus';
import { computeSlotsForDay, parseBreakMinutes } from '../utils/slots';

export function useDiaries(userId: Ref<number | null>) {
	const days = ref<Map<string, DayInfo>>(new Map());
	const loading = ref(false);
	const error = ref('');
	const selectedDate = ref<string | null>(null);
	const catchUpProgress = ref<{ current: number; total: number } | null>(null);

	const cache = new Map<string, Map<string, DayInfo>>();

	function cacheKey(year: number, month: number): string {
		return `${year}-${month}`;
	}

	async function fetchMonth(year: number, month: number) {
		if (!userId.value) return;

		const key = cacheKey(year, month);
		const cached = cache.get(key);
		if (cached) {
			days.value = cached;
			return;
		}

		loading.value = true;
		error.value = '';
		days.value = new Map();

		try {
			const from = `${year}-${String(month + 1).padStart(2, '0')}-01`;
			const lastDay = new Date(year, month + 1, 0).getDate();
			const to = `${year}-${String(month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

			const data = await fetchDiaries(userId.value, from, to);
			const diaries = data.diaries || [];

			// First pass: determine status from summary data alone
			const map = new Map<string, DayInfo>();
			const needsSlotCheck: number[] = [];
			const needsSlotCheckDates: string[] = [];

			for (const diary of diaries) {
				// Pass null so any day needing slot verification shows as 'needs-checkin'
				// placeholder — this includes differenceTime>=0 && workedMinutes===0 days.
				const quickStatus = getDayStatus(diary, null);
				map.set(diary.date, { diary, status: quickStatus });

				if (quickStatus === 'needs-checkin') {
					needsSlotCheck.push(diary.diarySummaryId);
					needsSlotCheckDates.push(diary.date);
				}
			}

			// Show calendar immediately with preliminary statuses
			days.value = new Map(map);

			// Second pass: resolve final status for all days that needed slot verification
			if (needsSlotCheck.length > 0) {
				const slotResults = await Promise.allSettled(
					needsSlotCheck.map((id) => fetchExistingSlots(id)),
				);

				for (let i = 0; i < slotResults.length; i++) {
					const result = slotResults[i];
					const date = needsSlotCheckDates[i];
					const info = map.get(date)!;
					const hasSlots = result.status === 'fulfilled' && result.value;
					const finalStatus = getDayStatus(info.diary, hasSlots);
					map.set(date, { diary: info.diary, status: finalStatus });
				}

				days.value = new Map(map);
			}

			cache.set(key, new Map(map));
		} catch (e) {
			error.value = (e as Error).message;
		} finally {
			loading.value = false;
		}
	}

	async function checkinDay(date: string) {
		if (!userId.value) return;

		const info = days.value.get(date);
		if (!info || info.status !== 'needs-checkin') return;

		const d = info.diary;
		const breakMinutes = parseBreakMinutes(d.breaks);
		const startTime = d.in || '09:00:00';

		const body = computeSlotsForDay({
			date: d.date,
			userId: userId.value,
			diaryId: d.diaryId,
			differenceTime: d.differenceTime,
			startTime,
			lunchMinutes: breakMinutes,
		});

		const result = await putSlots(d.diaryId, body);

		if (result.success || result.message === '_DuplicateSign') {
			const updated = new Map(days.value);
			updated.set(date, { diary: d, status: 'pending' });
			days.value = updated;
			// Invalidate cache for this month
			const dt = new Date(date + 'T12:00:00');
			cache.delete(cacheKey(dt.getFullYear(), dt.getMonth()));
		} else {
			throw new Error(result.message || 'Check-in failed');
		}
	}

	async function catchUpAll() {
		const toSubmit = [...days.value.entries()]
			.filter(([, info]) => info.status === 'needs-checkin')
			.map(([date]) => date)
			.sort();

		if (toSubmit.length === 0) return;

		catchUpProgress.value = { current: 0, total: toSubmit.length };

		for (const date of toSubmit) {
			try {
				await checkinDay(date);
			} catch {
				// continue with remaining days
			}
			catchUpProgress.value = { current: catchUpProgress.value!.current + 1, total: toSubmit.length };
		}

		catchUpProgress.value = null;
	}

	return {
		days,
		loading,
		error,
		selectedDate,
		catchUpProgress,
		fetchMonth,
		checkinDay,
		catchUpAll,
	};
}
