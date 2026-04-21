import { ref, computed } from 'vue';
import { login as apiLogin, fetchCurrentUserId } from './useApi';

const token = ref(localStorage.getItem('woffu_auth') ?? '');
const userId = ref<number | null>(
	localStorage.getItem('woffu_user_id') ? Number(localStorage.getItem('woffu_user_id')) : null,
);

export const isAuthenticated = computed(() => !!token.value && !!userId.value);

export function useAuth() {
	async function login(email: string, password: string) {
		const result = await apiLogin(email, password);
		const auth = `Bearer ${result.accessToken}`;

		localStorage.setItem('woffu_auth', auth);
		token.value = auth;

		const id = await fetchCurrentUserId();
		localStorage.setItem('woffu_user_id', String(id));
		userId.value = id;
	}

	function logout() {
		localStorage.removeItem('woffu_auth');
		localStorage.removeItem('woffu_user_id');
		token.value = '';
		userId.value = null;
	}

	return { token, userId, isAuthenticated, login, logout };
}
