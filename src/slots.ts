import type {
	ComputeSlotsOptions,
	FormattedValue,
	SignPayload,
	Slot,
	WorkdayBody,
} from './types.js';

function toUTCISO(dateStr: string, timeStr: string): string {
	// Create a Date in local timezone, then convert to UTC ISO string
	const localDate = new Date(`${dateStr}T${timeStr}`);

	return localDate.toISOString();
}

function pad(n: number): string {
	return String(n).padStart(2, '0');
}

export function timeToSeconds(time: string): number {
	const [h, m, s] = time.split(':').map(Number);
	return h * 3600 + m * 60 + (s || 0);
}

export function addSecondsToTime(baseTime: string, seconds: number): string {
	const total = timeToSeconds(baseTime) + seconds;
	const hh = Math.floor(total / 3600);
	const mm = Math.floor((total % 3600) / 60);
	const ss = total % 60;
	return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
}

export function parseFormattedMinutes(formatted: FormattedValue | null | undefined): number {
	if (!formatted?.values) return 0;

	const vals = formatted.values.map(Number);

	if (formatted.resource === '_HoursMinutesFormatted') {
		return (vals[0] || 0) * 60 + (vals[1] || 0);
	}

	return (vals[0] || 0) * 60;
}

export function parseBreakMinutes(breaks: FormattedValue | null | undefined): number {
	if (!breaks?.values) return 0;

	const vals = breaks.values.map(Number);

	if (breaks.resource === '_HoursMinutesFormatted') {
		return (vals[0] || 0) * 60 + (vals[1] || 0);
	}

	return (vals[0] || 0) * 60;
}

function buildSignPayload(
	date: string,
	userId: number,
	signIn: boolean,
	time: string,
): SignPayload {
	return {
		signId: 0,
		userId,
		date: toUTCISO(date, time),
		trueDate: toUTCISO(date, time),
		signIn,
		ip: null,
		latitude: null,
		longitude: null,
		outside: null,
		time,
		valueTime: time,
		shortTime: time,
		shortTrueTime: time,
		shortValueTime: time,
		utcTime: `${time} +0`,
		code: null,
		signType: 3,
		signStatus: 1,
		signEventId: null,
		deviceId: null,
		deviceType: 0,
		deleted: false,
		updatedOn: null,
		requestId: null,
		agreementEventId: null,
	};
}

export function computeSlotsForDay(options: ComputeSlotsOptions): WorkdayBody {
	const {
		date,
		userId,
		diaryId,
		differenceTime,
		startTime = '09:00:00',
		lunchStart = '14:00:00',
		lunchMinutes = 30,
	} = options;

	const workSeconds = Math.abs(Number(differenceTime || 0));
	const lunchSeconds = lunchMinutes * 60;
	const idBase = Date.now();
	const slots: Slot[] = [];

	const secondsUntilLunch = timeToSeconds(lunchStart) - timeToSeconds(startTime);

	if (lunchMinutes === 0 || workSeconds <= secondsUntilLunch) {
		const endTime = addSecondsToTime(startTime, workSeconds);

		slots.push({
			id: `${idBase}-0`,
			in: buildSignPayload(date, userId, true, startTime),
			out: buildSignPayload(date, userId, false, endTime),
			motive: null,
			totalMin: Math.round(workSeconds / 60),
		});
	} else {
		slots.push({
			id: `${idBase}-0`,
			in: buildSignPayload(date, userId, true, startTime),
			out: buildSignPayload(date, userId, false, lunchStart),
			motive: null,
			totalMin: Math.round(secondsUntilLunch / 60),
		});

		const remaining = workSeconds - secondsUntilLunch;
		const afternoonStart = addSecondsToTime(lunchStart, lunchSeconds);
		const afternoonEnd = addSecondsToTime(afternoonStart, remaining);

		slots.push({
			id: `${idBase}-1`,
			in: buildSignPayload(date, userId, true, afternoonStart),
			out: buildSignPayload(date, userId, false, afternoonEnd),
			motive: null,
			totalMin: Math.round(remaining / 60),
		});
	}

	return { userId, comments: '', date, slots, diaryId };
}
