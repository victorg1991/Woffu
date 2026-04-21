import type { DiariesResponse, WorkdayBody } from '../types';

function getAuth(): string {
	return localStorage.getItem('woffu_auth') ?? '';
}

function headers(): Record<string, string> {
	const auth = getAuth();
	return {
		'content-type': 'application/json',
		...(auth ? { authorization: auth } : {}),
	};
}

export interface LoginResult {
	accessToken: string;
	tokenType: string;
	expiresIn: number;
}

export async function login(email: string, pwd: string): Promise<LoginResult> {
	const body = `username=${encodeURIComponent(email)}&password=${encodeURIComponent(pwd)}&grant_type=password`;
	const res = await fetch('/auth-api/svc/accounts/authorization/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
		body,
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.detail || data.title || 'Login failed');
	return data as LoginResult;
}

export async function fetchCurrentUserId(): Promise<number> {
	const res = await fetch('/woffu-api/users', { headers: headers() });
	if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
	const data = await res.json();
	return data.UserId;
}

export async function fetchDiaries(userId: number, fromDate: string, toDate: string): Promise<DiariesResponse> {
	const params = new URLSearchParams({
		userId: String(userId),
		fromDate,
		toDate,
		pageSize: '1000000',
		includeHourTypes: 'true',
		includeNotHourTypes: 'true',
		includeDifference: 'true',
	});
	const url = `/woffu-api/svc/core/diariesquery/users/${userId}/diaries/summary/presence?${params}`;
	const res = await fetch(url, { headers: headers() });
	if (!res.ok) throw new Error(`Failed to fetch diaries: ${res.status}`);
	return res.json();
}

export async function fetchExistingSlots(diarySummaryId: number): Promise<boolean> {
	const url = `/woffu-api/svc/core/diariesquery/diarysummaries/${diarySummaryId}/workday/slots/self`;
	const res = await fetch(url, { headers: headers() });
	if (!res.ok) return false;
	const data = await res.json() as { slots?: { in?: { signId?: number } }[] };

	// signId === 0 means a template/placeholder slot, not actually submitted
	return Array.isArray(data.slots) && data.slots.some((s: { in?: { signId?: number } }) => (s.in?.signId ?? 0) > 0);
}

export interface PutSlotsResult {
	success: boolean;
	message?: string;
}

export async function putSlots(diaryId: number, body: WorkdayBody): Promise<PutSlotsResult> {
	const url = `/woffu-api/diaries/${diaryId}/workday/slots/self`;
	const res = await fetch(url, {
		method: 'PUT',
		headers: headers(),
		body: JSON.stringify(body),
	});
	const data = await res.json().catch(() => ({}));
	if (!res.ok) {
		return { success: false, message: (data as Record<string, string>).Message || `${res.status}` };
	}
	return { success: true };
}
