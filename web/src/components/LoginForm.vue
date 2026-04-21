<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';

const { login } = useAuth();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function handleSubmit() {
	console.log('handleSubmit called, email:', email.value, 'password length:', password.value.length);
	error.value = '';
	loading.value = true;
	try {
		await login(email.value, password.value);
	} catch (e) {
		error.value = (e as Error).message;
	} finally {
		loading.value = false;
	}
}
</script>

<template>
	<div class="login">
		<div class="login-card">
			<h1>Woffu Check-in</h1>
			<form @submit.prevent="handleSubmit">
				<label>
					Email
					<input v-model="email" type="email" placeholder="you@company.com" required autofocus />
				</label>
				<label>
					Password
					<input v-model="password" type="password" required />
				</label>
				<button type="submit" :disabled="loading">
					{{ loading ? 'Logging in...' : 'Log in' }}
				</button>
				<p v-if="error" class="error">{{ error }}</p>
			</form>
		</div>
	</div>
</template>

<style scoped>
.login {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	background: #f5f6fa;
}

.login-card {
	background: white;
	border-radius: 12px;
	padding: 2.5rem;
	width: 100%;
	max-width: 380px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

h1 {
	margin: 0 0 1.5rem;
	font-size: 1.4rem;
	text-align: center;
	color: #333;
}

label {
	display: block;
	margin-bottom: 1rem;
	font-size: 0.85rem;
	color: #555;
	font-weight: 500;
}

input {
	display: block;
	width: 100%;
	margin-top: 0.3rem;
	padding: 0.6rem 0.75rem;
	border: 1px solid #ddd;
	border-radius: 6px;
	font-size: 0.95rem;
	box-sizing: border-box;
}

input:focus {
	outline: none;
	border-color: #4a90d9;
	box-shadow: 0 0 0 2px rgba(74, 144, 217, 0.15);
}

button {
	width: 100%;
	padding: 0.7rem;
	margin-top: 0.5rem;
	background: #4a90d9;
	color: white;
	border: none;
	border-radius: 6px;
	font-size: 0.95rem;
	font-weight: 500;
	cursor: pointer;
}

button:hover:not(:disabled) {
	background: #3a7bc8;
}

button:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

.error {
	color: #d93025;
	font-size: 0.85rem;
	margin-top: 0.75rem;
	text-align: center;
}
</style>
