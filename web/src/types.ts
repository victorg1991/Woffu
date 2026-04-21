export interface FormattedValue {
	resource: '_HoursFormatted' | '_HoursMinutesFormatted';
	values: string[];
}

export interface AbsenceEvent {
	allDay: boolean;
	startDate: string;
	endDate: string;
	description: string;
	totalTimeFormatted: FormattedValue;
	totalTime: number;
	isTimeOnly: boolean;
}

export interface CalendarEvents {
	name: string | null;
	eventNames: string[] | null;
	holidayNames: string[] | null;
	isDisabled: boolean;
	isHoliday: boolean;
	isEvent: boolean;
}

export interface Diary {
	diaryId: number;
	diarySummaryId: number;
	userId: number;
	date: string;
	isWeekend: boolean;
	isHoliday: boolean;
	isEvent: boolean;
	name: string;
	comments: string | null;
	maxStartTime: string;
	minEndTime: string;
	accepted: boolean | null;
	differenceTime: number;
	isUserEditable: boolean;
	notRecognizedTimeFormatted: FormattedValue;
	diaryHourTypes: unknown[];
	shift: unknown | null;
	pendingAbsenceEvents: AbsenceEvent[] | null;
	absenceEvents: AbsenceEvent[] | null;
	pendingPresenceEvents: unknown[] | null;
	presenceEvents: unknown[] | null;
	calendarEvents: CalendarEvents;
	isPending: boolean;
	isToday: boolean;
	in: string;
	out: string;
	breaks: FormattedValue;
	workingTimeFormatted: FormattedValue;
	workedTimeFormatted: FormattedValue | null;
	differenceTimeFormatted: FormattedValue | null;
	isInDanger: boolean;
	isOutDanger: boolean;
	isDiffHoursDanger: boolean;
	scheduleTimeFormatted: FormattedValue;
	fullName: string | null;
	hasPendingDiaryChangeUser: boolean;
	hasPendingDiaryChangeTargetUser: boolean;
	diaryChangeRequestId: number | null;
}

export interface DiariesResponse {
	diaries: Diary[];
	totalWorkingTimeFormatted: FormattedValue;
	totalWorkedTimeFormatted: FormattedValue;
	totalDifferenceTime: number;
	totalDifferenceTimeFormatted: FormattedValue;
	totalRecords: number;
	isUserAcceptable: boolean;
	dynamicColumns: Record<string, unknown>;
	totalDynamicColumnsFormatted: Record<string, unknown>;
	totalNotRecognizedTimeFormatted: FormattedValue;
	totalScheduleTimeFormatted: FormattedValue;
}

export interface SignPayload {
	signId: number;
	userId: number;
	date: string;
	trueDate: string;
	signIn: boolean;
	ip: null;
	latitude: null;
	longitude: null;
	outside: null;
	time: string;
	valueTime: string;
	shortTime: string;
	shortTrueTime: string;
	shortValueTime: string;
	utcTime: string;
	code: null;
	signType: number;
	signStatus: number;
	signEventId: null;
	deviceId: null;
	deviceType: number;
	deleted: boolean;
	updatedOn: null;
	requestId: null;
	agreementEventId: null;
}

export interface Slot {
	id: string;
	in: SignPayload;
	out: SignPayload;
	motive: null;
	totalMin: number;
}

export interface WorkdayBody {
	userId: number;
	comments: string;
	date: string;
	slots: Slot[];
	diaryId: number;
}

export interface ComputeSlotsOptions {
	date: string;
	userId: number;
	diaryId: number;
	differenceTime: number;
	startTime?: string;
	lunchStart?: string;
	lunchMinutes?: number;
}

export type DayStatusType =
	| 'weekend-holiday'
	| 'absence'
	| 'approved'
	| 'pending'
	| 'needs-checkin'
	| 'today'
	| 'future';

export interface DayInfo {
	diary: Diary;
	status: DayStatusType;
}
