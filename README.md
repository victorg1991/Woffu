Woffu Check-in Script

Overview
- Fetches diaries summary for a date range.
- Skips weekends, holidays, and days with absence events.
- Computes 09:00 start with a 30-minute lunch at 14:00.
- Updates each eligible day via PUT to workday slots.

Requirements
- Node.js 18+ (uses native fetch) — verified with Node 20.
- API access to your Woffu environment.

Configure
- `WOFFU_BASE_URL`: e.g. `https://app.woffu.com`
- Auth: provide either
  - `WOFFU_AUTH`: e.g. `Bearer <token>`, or
  - `WOFFU_COOKIE`: raw cookie header value

Install
- No dependencies. Use Node directly.

Commands
- Run tests:
  `npm test`

- Dry-run (no changes):
  `WOFFU_BASE_URL=https://app.woffu.com WOFFU_AUTH="Bearer <token>" node scripts/checkin.js --user 212061 --from 2025-03-18 --to 2025-03-31 --dry-run`

- Perform updates (be careful):
  `WOFFU_BASE_URL=https://app.woffu.com WOFFU_AUTH="Bearer <token>" node scripts/checkin.js --user 212061 --from 2025-03-18 --to 2025-03-31`

Notes
- End time = start (09:00) + abs(differenceTime) + lunch (30m) when work exceeds 5 hours; otherwise a single morning slot is created.
- Script prints what it plans to send before performing PUT.

