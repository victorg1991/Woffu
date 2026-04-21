import { describe, expect, it } from 'vitest';
import { addSecondsToTime, computeSlotsForDay, parseBreakMinutes, parseFormattedMinutes, timeToSeconds } from '../src/slots.js';

describe('timeToSeconds', () => {
	it('converts HH:MM:SS to seconds', () => {
		expect(timeToSeconds('09:00:00')).toBe(32400);
		expect(timeToSeconds('14:00:00')).toBe(50400);
		expect(timeToSeconds('00:00:00')).toBe(0);
		expect(timeToSeconds('14:30:00')).toBe(52200);
	});
});

describe('addSecondsToTime', () => {
	it('adds seconds to a time string', () => {
		expect(addSecondsToTime('09:00:00', 3600)).toBe('10:00:00');
		expect(addSecondsToTime('14:00:00', 1800)).toBe('14:30:00');
		expect(addSecondsToTime('14:30:00', 14400)).toBe('18:30:00');
	});
});

describe('parseBreakMinutes', () => {
	it('parses _HoursMinutesFormatted', () => {
		expect(parseBreakMinutes({
			resource: '_HoursMinutesFormatted',
			values: ['0', '30'],
		})).toBe(30);
	});

	it('parses _HoursFormatted', () => {
		expect(parseBreakMinutes({
			resource: '_HoursFormatted',
			values: ['0'],
		})).toBe(0);

		expect(parseBreakMinutes({
			resource: '_HoursFormatted',
			values: ['1'],
		})).toBe(60);
	});

	it('returns 0 for null/undefined', () => {
		expect(parseBreakMinutes(null)).toBe(0);
		expect(parseBreakMinutes(undefined)).toBe(0);
	});
});

describe('parseFormattedMinutes', () => {
	it('returns 0 for null/undefined', () => {
		expect(parseFormattedMinutes(null)).toBe(0);
		expect(parseFormattedMinutes(undefined)).toBe(0);
	});

	it('returns 0 for _HoursFormatted with 0 hours', () => {
		expect(parseFormattedMinutes({
			resource: '_HoursFormatted',
			values: ['0'],
		})).toBe(0);
	});

	it('parses _HoursMinutesFormatted with actual worked time', () => {
		expect(parseFormattedMinutes({
			resource: '_HoursMinutesFormatted',
			values: ['9', '3'],
		})).toBe(543);
	});

	it('parses _HoursFormatted with whole hours', () => {
		expect(parseFormattedMinutes({
			resource: '_HoursFormatted',
			values: ['6'],
		})).toBe(360);
	});
});

describe('computeSlotsForDay', () => {
	it('creates two slots for 8.5h workday (30600s) with 30m lunch', () => {
		const body = computeSlotsForDay({
			date: '2025-03-03',
			userId: 212061,
			diaryId: 1,
			differenceTime: -30600,
		});

		expect(body.slots).toHaveLength(2);
		expect(body.slots[0].in.time).toBe('09:00:00');
		expect(body.slots[0].out.time).toBe('14:00:00');
		expect(body.slots[1].in.time).toBe('14:30:00');
		expect(body.slots[1].out.time).toBe('18:00:00');
	});

	it('creates single slot for 4h workday (14400s)', () => {
		const body = computeSlotsForDay({
			date: '2025-03-04',
			userId: 212061,
			diaryId: 2,
			differenceTime: -14400,
		});

		expect(body.slots).toHaveLength(1);
		expect(body.slots[0].in.time).toBe('09:00:00');
		expect(body.slots[0].out.time).toBe('13:00:00');
	});

	it('creates two slots for 10h workday (36000s)', () => {
		const body = computeSlotsForDay({
			date: '2025-03-05',
			userId: 212061,
			diaryId: 3,
			differenceTime: -36000,
		});

		expect(body.slots).toHaveLength(2);
		expect(body.slots[0].out.time).toBe('14:00:00');
		expect(body.slots[1].in.time).toBe('14:30:00');
		expect(body.slots[1].out.time).toBe('19:30:00');
	});

	it('creates single slot when lunchMinutes is 0 (no break)', () => {
		const body = computeSlotsForDay({
			date: '2025-03-07',
			userId: 212061,
			diaryId: 4,
			differenceTime: -21600,
			lunchMinutes: 0,
		});

		expect(body.slots).toHaveLength(1);
		expect(body.slots[0].in.time).toBe('09:00:00');
		expect(body.slots[0].out.time).toBe('15:00:00');
	});

	it('uses custom startTime from API', () => {
		const body = computeSlotsForDay({
			date: '2025-03-10',
			userId: 100,
			diaryId: 5,
			differenceTime: -14400,
			startTime: '08:00:00',
		});

		expect(body.slots).toHaveLength(1);
		expect(body.slots[0].in.time).toBe('08:00:00');
		expect(body.slots[0].out.time).toBe('12:00:00');
	});
});

describe('computeSlotsForDay body structure', () => {
	it('returns correct top-level fields', () => {
		const body = computeSlotsForDay({
			date: '2025-02-18',
			userId: 212061,
			diaryId: 599225561,
			differenceTime: -30600,
		});

		expect(body.userId).toBe(212061);
		expect(body.date).toBe('2025-02-18');
		expect(body.diaryId).toBe(599225561);
		expect(body.slots).toHaveLength(2);
	});

	it('produces valid sign payloads', () => {
		const body = computeSlotsForDay({
			date: '2025-02-18',
			userId: 212061,
			diaryId: 599225561,
			differenceTime: -30600,
		});

		for (const slot of body.slots) {
			for (const edge of ['in', 'out'] as const) {
				expect(slot[edge].signType).toBe(3);
				expect(slot[edge].signStatus).toBe(1);
				expect(slot[edge].userId).toBe(212061);
				expect(slot[edge].time).toMatch(/^\d{2}:\d{2}:\d{2}$/);
				expect(slot[edge].date).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
			}
		}
	});
});
