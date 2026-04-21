import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export function loadEnv(): void {
	try {
		const dir = dirname(fileURLToPath(import.meta.url));
		const envPath = resolve(dir, '..', '.env');
		const content = readFileSync(envPath, 'utf8');

		for (const line of content.split('\n')) {
			const trimmed = line.trim();
			if (!trimmed || trimmed.startsWith('#')) continue;

			const idx = trimmed.indexOf('=');
			if (idx === -1) continue;

			const key = trimmed.slice(0, idx);
			const value = trimmed.slice(idx + 1);

			if (!process.env[key]) {
				process.env[key] = value;
			}
		}
	} catch {
		// .env file is optional
	}
}

export function getConfig() {
	return {
		baseUrl: process.env.WOFFU_BASE_URL || '',
		auth: process.env.WOFFU_AUTH || '',
		cookie: process.env.WOFFU_COOKIE || '',
	};
}
