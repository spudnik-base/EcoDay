// EcoDay configuration. Edit these at the start of each year and redeploy.
//
// Year-rollover checklist (TWO Google Sheets now: one for stream, one for meadow):
//   1. Create a fresh Google Sheet for stream data and one for meadow data.
//   2. In each Sheet, open Extensions > Apps Script, paste the script from
//      the README, deploy as a web app (Execute as: Me, Access: Anyone).
//   3. Copy each /exec URL.
//   4. Replace WEBHOOK_URL_STREAM and WEBHOOK_URL_MEADOW below.
//   5. Bump YEAR.
//   6. Commit and push. Vercel auto-deploys.
//
// If you only have one Sheet for now, point both URLs at it. Stream and
// meadow rows will land in the same Sheet; the dashboard charts handle
// either layout because each row is filled only on its own side.
const SINGLE_SHEET_FALLBACK =
  "https://script.google.com/macros/s/AKfycbyf8etVUXXtA5XNlfZ4KGCkDpCxN15hdCTeWt1HcElTS2RXMEv1DG3RqdLFU0CYjRyqFA/exec";

export const CONFIG = {
  WEBHOOK_URL_STREAM: SINGLE_SHEET_FALLBACK,
  WEBHOOK_URL_MEADOW: SINGLE_SHEET_FALLBACK,
  YEAR:         2026,
  SITE_COUNT:   10,
  GROUP_COUNT:  10,
  REFRESH_SECS: 30
} as const;
