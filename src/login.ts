#!/usr/bin/env node

import { createInterface } from 'readline';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const TOKEN_URL = 'https://app.woffu.com/api/svc/accounts/authorization/token';

function envPath(): string {
	const dir = dirname(fileURLToPath(import.meta.url));

	return resolve(dir, '..', '.env');
}

function prompt(question: string, hidden = false): Promise<string> {
	const rl = createInterface({ input: process.stdin, output: process.stdout });

	return new Promise((resolve) => {
		if (hidden && process.stdin.isTTY) {
			process.stdout.write(question);

			const stdin = process.stdin;
			stdin.setRawMode(true);
			stdin.resume();

			let input = '';

			stdin.on('data', (ch: Buffer) => {
				const c = ch.toString();

				if (c === '\n' || c === '\r') {
					stdin.setRawMode(false);
					stdin.pause();
					process.stdout.write('\n');
					rl.close();
					resolve(input);
				} else if (c === '\u0003') {
					process.exit(0);
				} else if (c === '\u007f' || c === '\b') {
					if (input.length > 0) {
						input = input.slice(0, -1);
						process.stdout.write('\b \b');
					}
				} else {
					input += c;
					process.stdout.write('*');
				}
			});
		} else {
			rl.question(question, (answer) => {
				rl.close();
				resolve(answer);
			});
		}
	});
}

interface TokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	[key: string]: unknown;
}

interface ErrorResponse {
	detail?: string;
	title?: string;
}

async function fetchToken(username: string, password: string): Promise<TokenResponse> {
	const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;
	const res = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
		body,
	});

	const data = await res.json();

	if (!res.ok) {
		const err = data as ErrorResponse;
		const detail = err.detail || err.title || `${res.status} ${res.statusText}`;

		throw new Error(detail);
	}

	return data as TokenResponse;
}

function updateEnvFile(key: string, value: string): void {
	const path = envPath();
	let content = '';

	try {
		content = readFileSync(path, 'utf8');
	} catch {
		// file doesn't exist yet
	}

	const lines = content.split('\n');
	let found = false;

	for (let i = 0; i < lines.length; i++) {
		if (lines[i].startsWith(`${key}=`)) {
			lines[i] = `${key}=${value}`;
			found = true;
			break;
		}
	}

	if (!found) {
		const insertLine = `${key}=${value}`;

		if (lines.length > 0 && lines[lines.length - 1] === '') {
			lines.splice(lines.length - 1, 0, insertLine);
		} else {
			lines.push(insertLine);
		}
	}

	writeFileSync(path, lines.join('\n'));
}

async function main(): Promise<void> {
	console.log();
	console.log(chalk.bold.cyan('  Woffu Login'));
	console.log();

	const username = await prompt(chalk.dim('  Email: '));
	const password = await prompt(chalk.dim('  Password: '), true);

	console.log();

	try {
		const token = await fetchToken(username, password);
		const auth = `${token.token_type} ${token.access_token}`;

		updateEnvFile('WOFFU_AUTH', auth);

		console.log(`  ${chalk.bgGreen.black(' OK ')} Token saved to .env`);

		if (token.expires_in) {
			const days = Math.floor(token.expires_in / 86400);

			console.log(chalk.dim(`  Expires in ${days} days`));
		}
	} catch (e) {
		console.error(`  ${chalk.bgRed.white(' ERROR ')} ${chalk.red((e as Error).message)}`);
		process.exit(1);
	}

	console.log();
}

await main();
