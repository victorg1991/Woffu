import type { Diary, DayStatusType } from '../types';
import { parseFormattedMinutes } from './slots';

// Pass null for hasExistingSlots on the first pass (before slot API calls).
// null means "unverified" — days that need a slot check will return 'needs-checkin'
// as a placeholder so they get included in the slot fetch.
export function getDayStatus(day: Diary, hasExistingSlots: boolean | null): DayStatusType {
	const today = new Date().toISOString().slice(0, 10);

	if (day.date > today) return 'future';
	if (day.date === today) return 'today';
	if (day.isWeekend || day.isHoliday) return 'weekend-holiday';
	if (day.absenceEvents && day.absenceEvents.length) return 'absence';

	const workedMinutes = parseFormattedMinutes(day.workedTimeFormatted);

	// Work is recorded and approved — no slot check needed
	if (workedMinutes > 0) return 'approved';

	// Nothing worked — check whether slots were submitted
	if (hasExistingSlots === null) return 'needs-checkin'; // placeholder for first pass
	if (hasExistingSlots) return 'pending';
	return 'needs-checkin';
}
