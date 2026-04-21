<script setup lang="ts">
import { isAuthenticated } from './composables/useAuth';
import LoginForm from './components/LoginForm.vue';
import CalendarView from './components/CalendarView.vue';
</script>

<template>
	<CalendarView v-if="isAuthenticated" />
	<LoginForm v-else />
</template>
