<script setup lang="ts">
import { ref } from 'vue';
import type { DayInfo } from '../types';
import { parseFormattedMinutes } from '../utils/slots';

const props = defineProps<{ dayInfo: DayInfo }>();
const emit = defineEmits<{ checkin: [date: string] }>();

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const submitting = ref(false);
const error = ref('');

function formatDate(dateStr: string): string {
	const d = new Date(dateStr + 'T12:00:00');
	return `${WEEKDAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function formatTime(t: string): string {
	return t?.slice(0, 5) ?? '--:--';
}

function formatMinutes(mins: number): string {
	const h = Math.floor(mins / 60);
	const m = mins % 60;
	return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

const STATUS_LABELS: Record<string, string> = {
	'weekend-holiday': 'Weekend / Holiday',
	absence: 'Absence',
	approved: 'Approved',
	pending: 'Pending Approval',
	'needs-checkin': 'Needs Check-in',
	today: 'Today',
	future: 'Future',
};

async function handleCheckin() {
	submitting.value = true;
	error.value = '';
	try {
		emit('checkin', props.dayInfo.diary.date);
	} catch (e) {
		error.value = (e as Error).message;
	} finally {
		submitting.value = false;
	}
}
</script>

<template>
	<div class="detail">
		<h3>{{ formatDate(dayInfo.diary.date) }}</h3>

		<div class="status-badge" :class="`badge--${dayInfo.status}`">
			{{ STATUS_LABELS[dayInfo.status] || dayInfo.status }}
		</div>

		<div class="info-grid">
			<span class="label">Schedule</span>
			<span>{{ formatTime(dayInfo.diary.in) }} - {{ formatTime(dayInfo.diary.out) }}</span>

			<span class="label">Required</span>
			<span>{{ formatMinutes(Math.abs(dayInfo.diary.differenceTime) / 60) }}</span>

			<template v-if="dayInfo.diary.workedTimeFormatted">
				<span class="label">Worked</span>
				<span>{{ formatMinutes(parseFormattedMinutes(dayInfo.diary.workedTimeFormatted)) }}</span>
			</template>

			<template v-if="dayInfo.diary.absenceEvents?.length">
				<span class="label">Absence</span>
				<span>{{ dayInfo.diary.absenceEvents[0].description }}</span>
			</template>
		</div>

		<button
			v-if="dayInfo.status === 'needs-checkin'"
			class="checkin-btn"
			:disabled="submitting"
			@click="handleCheckin"
		>
			{{ submitting ? 'Submitting...' : 'Check In' }}
		</button>

		<p v-if="error" class="error">{{ error }}</p>
	</div>
</template>

<style scoped>
.detail {
	padding: 1.25rem;
	background: white;
	border-radius: 10px;
	box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
}

h3 {
	margin: 0 0 0.75rem;
	font-size: 1rem;
	color: #333;
}

.status-badge {
	display: inline-block;
	padding: 0.2rem 0.6rem;
	border-radius: 4px;
	font-size: 0.75rem;
	font-weight: 600;
	margin-bottom: 1rem;
}

.badge--approved { background: #d4edda; color: #1b5e20; }
.badge--pending { background: #fff3cd; color: #856404; }
.badge--needs-checkin { background: #f8d7da; color: #721c24; }
.badge--weekend-holiday, .badge--absence { background: #e9ecef; color: #666; }
.badge--today { background: #e3f2fd; color: #1565c0; }
.badge--future { background: #fafafa; color: #999; }

.info-grid {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 0.3rem 1rem;
	font-size: 0.85rem;
	margin-bottom: 1rem;
}

.label {
	color: #888;
	font-weight: 500;
}

.checkin-btn {
	width: 100%;
	padding: 0.6rem;
	background: #4a90d9;
	color: white;
	border: none;
	border-radius: 6px;
	font-size: 0.9rem;
	font-weight: 500;
	cursor: pointer;
}

.checkin-btn:hover:not(:disabled) { background: #3a7bc8; }
.checkin-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.error {
	color: #d93025;
	font-size: 0.8rem;
	margin-top: 0.5rem;
}
</style>
