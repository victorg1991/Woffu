<script setup lang="ts">
import { ref, computed, watch, toRef } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useDiaries } from '../composables/useDiaries';
import CalendarDay from './CalendarDay.vue';
import DayDetail from './DayDetail.vue';

const { userId, logout } = useAuth();
const { days, loading, error, selectedDate, catchUpProgress, fetchMonth, checkinDay, catchUpAll } = useDiaries(toRef(userId));

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth());

const monthLabel = computed(() => `${MONTHS[currentMonth.value]} ${currentYear.value}`);

const needsCheckinCount = computed(() =>
	[...days.value.values()].filter((d) => d.status === 'needs-checkin').length,
);

interface CalendarCell {
	day: number | null;
	date: string | null;
}

const calendarCells = computed<CalendarCell[]>(() => {
	const year = currentYear.value;
	const month = currentMonth.value;
	const firstDay = new Date(year, month, 1);
	const lastDate = new Date(year, month + 1, 0).getDate();

	let startDow = firstDay.getDay() - 1;
	if (startDow < 0) startDow = 6;

	const cells: CalendarCell[] = [];

	for (let i = 0; i < startDow; i++) {
		cells.push({ day: null, date: null });
	}

	for (let d = 1; d <= lastDate; d++) {
		const mm = String(month + 1).padStart(2, '0');
		const dd = String(d).padStart(2, '0');
		cells.push({ day: d, date: `${year}-${mm}-${dd}` });
	}

	while (cells.length % 7 !== 0) {
		cells.push({ day: null, date: null });
	}

	return cells;
});

const selectedDayInfo = computed(() => {
	if (!selectedDate.value) return null;
	return days.value.get(selectedDate.value) ?? null;
});

function prevMonth() {
	if (currentMonth.value === 0) {
		currentMonth.value = 11;
		currentYear.value--;
	} else {
		currentMonth.value--;
	}
}

function nextMonth() {
	if (currentMonth.value === 11) {
		currentMonth.value = 0;
		currentYear.value++;
	} else {
		currentMonth.value++;
	}
}

async function handleCheckin(date: string) {
	try {
		await checkinDay(date);
	} catch (e) {
		console.error('Check-in failed:', (e as Error).message);
	}
}

watch([currentYear, currentMonth], () => {
	selectedDate.value = null;
	fetchMonth(currentYear.value, currentMonth.value);
}, { immediate: true });
</script>

<template>
	<div class="dashboard">
		<header class="topbar">
			<h1>Woffu Check-in</h1>
			<div class="topbar-actions">
				<button
					class="catchup-btn"
					:disabled="!!catchUpProgress || needsCheckinCount === 0"
					@click="catchUpAll"
				>
					<template v-if="catchUpProgress">
						{{ catchUpProgress.current }}/{{ catchUpProgress.total }}...
					</template>
					<template v-else-if="needsCheckinCount > 0">
						Catch Up ({{ needsCheckinCount }})
					</template>
					<template v-else>
						All done
					</template>
				</button>
				<button class="logout-btn" @click="logout">Logout</button>
			</div>
		</header>

		<div class="month-nav">
			<button class="nav-btn" @click="prevMonth">&larr;</button>
			<span class="month-label">{{ monthLabel }}</span>
			<button class="nav-btn" @click="nextMonth">&rarr;</button>
		</div>

		<div v-if="error" class="error-bar">{{ error }}</div>

		<div class="main-layout">
			<div class="calendar-side">
				<div class="calendar-wrapper">
					<div class="calendar-grid">
						<div v-for="h in WEEKDAY_HEADERS" :key="h" class="weekday-header">{{ h }}</div>
						<CalendarDay
							v-for="(cell, i) in calendarCells"
							:key="i"
							:day="cell.day"
							:date="cell.date"
							:status="cell.date ? (days.get(cell.date)?.status ?? null) : null"
							:is-selected="cell.date === selectedDate"
							@select="selectedDate = $event"
						/>
					</div>
					<div v-if="loading" class="loading-overlay">Loading...</div>
				</div>

				<div class="legend">
					<span class="legend-item"><span class="dot dot--needs-checkin" /> Needs check-in</span>
					<span class="legend-item"><span class="dot dot--pending" /> Pending</span>
					<span class="legend-item"><span class="dot dot--approved" /> Approved</span>
					<span class="legend-item"><span class="dot dot--absence" /> Absence</span>
				</div>
			</div>

			<div class="detail-side">
				<DayDetail
					v-if="selectedDayInfo"
					:day-info="selectedDayInfo"
					@checkin="handleCheckin"
				/>
				<div v-else class="detail-placeholder">
					Click a day to see details
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.dashboard {
	max-width: 900px;
	margin: 0 auto;
	padding: 1.5rem;
}

.topbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.25rem;
}

.topbar h1 {
	font-size: 1.3rem;
	margin: 0;
	color: #333;
}

.topbar-actions {
	display: flex;
	gap: 0.5rem;
}

.catchup-btn {
	padding: 0.4rem 0.8rem;
	background: #e74c3c;
	color: white;
	border: none;
	border-radius: 6px;
	font-size: 0.8rem;
	font-weight: 500;
	cursor: pointer;
}

.catchup-btn:hover:not(:disabled) { background: #c0392b; }
.catchup-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.logout-btn {
	padding: 0.4rem 0.8rem;
	background: #eee;
	color: #555;
	border: none;
	border-radius: 6px;
	font-size: 0.8rem;
	cursor: pointer;
}

.logout-btn:hover { background: #ddd; }

.month-nav {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1.5rem;
	margin-bottom: 1rem;
}

.month-label {
	font-size: 1.05rem;
	font-weight: 600;
	min-width: 150px;
	text-align: center;
}

.nav-btn {
	background: none;
	border: 1px solid #ddd;
	border-radius: 6px;
	padding: 0.3rem 0.7rem;
	font-size: 1rem;
	cursor: pointer;
}

.nav-btn:hover { background: #f5f5f5; }

.error-bar {
	background: #fce4ec;
	color: #c62828;
	padding: 0.6rem 1rem;
	border-radius: 6px;
	margin-bottom: 1rem;
	font-size: 0.85rem;
}

.main-layout {
	display: flex;
	gap: 1.5rem;
	align-items: flex-start;
}

.calendar-side {
	flex: 0 0 340px;
}

.calendar-wrapper {
	position: relative;
}

.calendar-grid {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: 3px;
}

.weekday-header {
	text-align: center;
	font-size: 0.7rem;
	color: #888;
	font-weight: 600;
	padding-bottom: 0.25rem;
}

.loading-overlay {
	position: absolute;
	inset: 0;
	background: rgba(255, 255, 255, 0.8);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.85rem;
	color: #888;
	border-radius: 8px;
}

.legend {
	display: flex;
	gap: 0.75rem;
	margin-top: 0.6rem;
	flex-wrap: wrap;
}

.legend-item {
	display: flex;
	align-items: center;
	gap: 0.25rem;
	font-size: 0.65rem;
	color: #666;
}

.dot {
	width: 8px;
	height: 8px;
	border-radius: 2px;
}

.dot--needs-checkin { background: #f8d7da; }
.dot--pending { background: #fff3cd; }
.dot--approved { background: #d4edda; }
.dot--absence { background: #e9ecef; }

.detail-side {
	flex: 1;
	min-width: 0;
}

.detail-placeholder {
	padding: 2rem;
	text-align: center;
	color: #aaa;
	font-size: 0.9rem;
	background: white;
	border-radius: 10px;
	box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
}
</style>
