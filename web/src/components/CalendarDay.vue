<script setup lang="ts">
import type { DayStatusType } from '../types';

defineProps<{
	day: number | null;
	date: string | null;
	status: DayStatusType | null;
	isSelected: boolean;
}>();

defineEmits<{ select: [date: string] }>();
</script>

<template>
	<div
		v-if="day"
		class="cell"
		:class="[status ? `day--${status}` : '', isSelected ? 'day--selected' : '']"
		@click="date && $emit('select', date)"
	>
		{{ day }}
	</div>
	<div v-else class="cell cell--empty" />
</template>

<style scoped>
.cell {
	aspect-ratio: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 6px;
	font-size: 0.75rem;
	cursor: pointer;
	transition: box-shadow 0.15s;
	user-select: none;
}

.cell:hover:not(.cell--empty) {
	box-shadow: 0 0 0 2px rgba(74, 144, 217, 0.4);
}

.cell--empty {
	cursor: default;
}

.day--selected {
	box-shadow: 0 0 0 2px #4a90d9 !important;
}

.day--weekend-holiday {
	background: #f0f0f0;
	color: #aaa;
}

.day--absence {
	background: #e9ecef;
	color: #888;
}

.day--approved {
	background: #d4edda;
	color: #1b5e20;
}

.day--pending {
	background: #fff3cd;
	color: #856404;
}

.day--needs-checkin {
	background: #f8d7da;
	color: #721c24;
}

.day--today {
	background: #e3f2fd;
	color: #1565c0;
	font-weight: 700;
}

.day--future {
	background: #fafafa;
	color: #ccc;
}
</style>
