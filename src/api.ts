import type { DiariesResponse, WorkdayBody } from './types.js';

interface ApiConfig {
	baseUrl: string;
	auth: string;
	cookie: string;
}

function buildHeaders(config: ApiConfig): Record<string, string> {
	const headers: Record<string, string> = {
		'content-type': 'application/json',
	};

	if (config.auth) headers['authorization'] = config.auth;
	if (config.cookie) headers['cookie'] = config.cookie;

	return headers;
}

export async function fetchCurrentUserId(config: ApiConfig): Promise<number> {
	const url = `${config.baseUrl}/api/users`;
	const res = await fetch(url, { headers: buildHeaders(config) });

	if (!res.ok) {
		throw new Error(`Failed to fetch current user: ${res.status} ${res.statusText}`);
	}

	const data = await res.json() as Record<string, unknown>;

	if (!data.UserId || typeof data.UserId !== 'number') {
		throw new Error('Could not determine UserId from /api/users');
	}

	return data.UserId;
}

export async function fetchDiaries(
	config: ApiConfig,
	userId: number,
	fromDate: string,
	toDate: string,
): Promise<DiariesResponse> {
	const params = new URLSearchParams({
		userId: String(userId),
		fromDate,
		toDate,
		pageSize: '1000000',
		includeHourTypes: 'true',
		includeNotHourTypes: 'true',
		includeDifference: 'true',
	});

	const url = `${config.baseUrl}/api/svc/core/diariesquery/users/${userId}/diaries/summary/presence?${params}`;
	const res = await fetch(url, { headers: buildHeaders(config) });

	if (!res.ok) {
		throw new Error(`Failed to fetch diaries: ${res.status} ${res.statusText}`);
	}

	return res.json() as Promise<DiariesResponse>;
}

export async function fetchExistingSlots(
	config: ApiConfig,
	diarySummaryId: number,
): Promise<boolean> {
	const url = `${config.baseUrl}/api/svc/core/diariesquery/diarysummaries/${diarySummaryId}/workday/slots/self`;
	const res = await fetch(url, { headers: buildHeaders(config) });

	if (!res.ok) return false;

	const data = await res.json() as { slots?: { in?: { signId?: number } }[] };

	// signId === 0 means a template/placeholder slot, not actually submitted
	return Array.isArray(data.slots) && data.slots.some((s) => (s.in?.signId ?? 0) > 0);
}

export interface PutSlotsResult {
	success: boolean;
	message?: string;
	data?: Record<string, unknown>;
}

export async function putSlots(
	config: ApiConfig,
	diaryId: number,
	body: WorkdayBody,
): Promise<PutSlotsResult> {
	const url = `${config.baseUrl}/api/diaries/${diaryId}/workday/slots/self`;
	const res = await fetch(url, {
		method: 'PUT',
		headers: buildHeaders(config),
		body: JSON.stringify(body),
	});

	const data = await res.json().catch(() => ({})) as Record<string, unknown>;

	if (!res.ok) {
		const message = (data?.Message as string) || `${res.status} ${res.statusText}`;

		return { success: false, message };
	}

	return { success: true, data };
}
