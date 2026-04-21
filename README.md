# Woffu Check-in

Automates Woffu diary check-in for days with missing time. Ships as a CLI and a web app sharing the same API logic.

## Features

- Skips weekends, holidays, absences, and days already worked.
- Detects days with real submissions (slots with `signId > 0`) vs. placeholder slots, so they are not re-submitted.
- Computes a 09:00 start with a 30-minute lunch around 14:00; end time = start + workday + lunch.
- Catch-up over a date range, last 7 days, or a custom `--from`/`--to`.

## Requirements

- Node.js 20+ (native `fetch`).
- Woffu account credentials.

## Configuration

Create a `.env` in the repo root (or export the vars):

```
WOFFU_BASE_URL=https://app.woffu.com
WOFFU_AUTH=Bearer <token>
# Optional cookie auth instead of bearer:
# WOFFU_COOKIE=<raw cookie header>
# Optional: skip user lookup
# WOFFU_USER_ID=212061
```

The `login` script fetches a fresh OAuth token and writes it to `.env`:

```
npm run login
```

## CLI

Install once:

```
npm install
```

### Commands

| Command                           | Description                                      |
| --------------------------------- | ------------------------------------------------ |
| `npm run login`                   | Prompt for credentials, save token to `.env`.    |
| `npm run catchup`                 | Check in last 3 months up to yesterday.          |
| `npm run lastweek`                | Check in the last 7 days (ending yesterday).     |
| `npm run start -- <flags>`        | Custom range (see flags below).                  |
| `npm test`                        | Run unit tests.                                  |
| `npm run build`                   | Compile TypeScript to `dist/`.                   |

### Flags

```
--user <id>          User ID (auto-detected from token if omitted)
--from <YYYY-MM-DD>  Start date (inclusive)
--to <YYYY-MM-DD>    End date (inclusive)
--catch-up           Auto-fill last 3 months up to yesterday
--last-week          Auto-fill last 7 days up to yesterday
--dry-run            Preview without submitting
--help               Show help
```

### Examples

```
# Preview last week without submitting
npm run lastweek -- --dry-run

# Submit a specific range
npm run start -- --from 2026-04-07 --to 2026-04-08

# Preview custom range
npm run start -- --from 2026-04-01 --to 2026-04-08 --dry-run
```

Output statuses:

- `READY` — dry-run preview of what would be submitted.
- `OK` — successfully checked in.
- `PENDING` — already submitted, awaiting approval.
- `--` — skipped (weekend, holiday, absence, or already worked).
- `ERROR` — submission failed.

## Web App

A Vue 3 + Vite UI for the same flow. Lives in `web/`.

```
cd web
npm install
npm run dev
```

Opens at `http://localhost:5173`. Log in with Woffu credentials. The app:

- Shows a calendar with color-coded day status (approved / pending / needs check-in / weekend-holiday / absence).
- Lets you view and check in individual days from the day detail panel.
- Provides a **Catch Up** button that submits all eligible pending days.

The Vite dev server proxies `/auth-api` → `app.woffu.com` and `/woffu-api` → `liferay.woffu.com` to avoid CORS.

## How it works

1. Fetches diary summary for the range from `/api/svc/core/diariesquery/users/{id}/diaries/summary/presence`.
2. For each workday with no recorded time, calls `/api/svc/core/diariesquery/diarysummaries/{id}/workday/slots/self` to check for real submitted slots (`signId > 0`).
3. If no real slots exist, computes slots from the schedule and `PUT`s them to `/api/diaries/{diaryId}/workday/slots/self`.
