import chalk from 'chalk';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDate(dateStr: string): string {
	const d = new Date(dateStr + 'T12:00:00');

	return `${WEEKDAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function formatTime(time: string): string {
	return time.slice(0, 5);
}

function formatHours(seconds: number): string {
	const h = Math.floor(Math.abs(seconds) / 3600);
	const m = Math.floor((Math.abs(seconds) % 3600) / 60);

	return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function header(from: string, to: string, userId: number, dryRun: boolean): void {
	console.log();
	console.log(chalk.bold.cyan('  Woffu Check-in'));
	console.log(chalk.dim(`  ${formatDate(from)} - ${formatDate(to)}  |  User ${userId}`) + (dryRun ? `  |  ${chalk.yellow('DRY RUN')}` : ''));
	console.log();
}

export function skipDay(dateStr: string, reason: string): void {
	console.log(`  ${chalk.dim(formatDate(dateStr).padEnd(18))} ${chalk.dim('--  ' + reason)}`);
}


export function preparedDay(dateStr: string, startTime: string, endTime: string, diffSeconds: number): void {
	const hours = formatHours(diffSeconds);

	console.log(
		`  ${chalk.blue(formatDate(dateStr).padEnd(18))} ${chalk.bgBlue.white(' READY ')} ${formatTime(startTime)} - ${formatTime(endTime)}  ${chalk.dim(`(${hours})`)}`,
	);
}

export function successDay(dateStr: string, startTime: string, endTime: string): void {
	console.log(
		`  ${chalk.green(formatDate(dateStr).padEnd(18))} ${chalk.bgGreen.black(' OK ')} ${chalk.dim(`${formatTime(startTime)} - ${formatTime(endTime)}`)}`,
	);
}

export function pendingApprovalDay(dateStr: string): void {
	console.log(
		`  ${chalk.yellow(formatDate(dateStr).padEnd(18))} ${chalk.bgYellow.black(' PENDING ')} ${chalk.yellow('submitted, awaiting approval')}`,
	);
}

export function errorDay(dateStr: string, message: string): void {
	console.log(
		`  ${chalk.red(formatDate(dateStr).padEnd(18))} ${chalk.bgRed.white(' ERROR ')} ${chalk.red(message)}`,
	);
}

export function summary(total: number, checked: number, skipped: number, pending: number, errors: number): void {
	console.log();

	const parts = [
		`${chalk.bold('Done:')} ${total} days`,
		chalk.green(`${checked} checked in`),
		chalk.dim(`${skipped} skipped`),
	];

	if (pending > 0) parts.push(chalk.yellow(`${pending} pending approval`));
	if (errors > 0) parts.push(chalk.red(`${errors} errors`));

	console.log('  ' + parts.join('  '));
	console.log();
}

export function configError(message: string): void {
	console.error(`\n  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(message)}\n`);
}
