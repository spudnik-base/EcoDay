// EcoDay configuration. Edit these at the start of each year and redeploy.
//
// Year-rollover checklist (TWO Google Sheets: one for stream, one for meadow):
//   1. Create a fresh Google Sheet for stream data and one for meadow data.
//   2. In each Sheet, open Extensions > Apps Script, paste the script from
//      the README, deploy as a web app (Execute as: Me, Access: Anyone).
//   3. Copy each /exec URL.
//   4. Replace WEBHOOK_URL_STREAM and WEBHOOK_URL_MEADOW below.
//   5. Bump YEAR.
//   6. Commit and push. Vercel auto-deploys.
export const CONFIG = {
  WEBHOOK_URL_STREAM:
    "https://script.google.com/macros/s/AKfycbyf8etVUXXtA5XNlfZ4KGCkDpCxN15hdCTeWt1HcElTS2RXMEv1DG3RqdLFU0CYjRyqFA/exec",
  WEBHOOK_URL_MEADOW:
    "https://script.google.com/macros/s/AKfycbwHladItVH-F2THYq9lADHNaXaE0SbBrO84GQfu_kDi5V5QJcVKkFKzkEcLQruVfl9ZWg/exec",
  YEAR:         2026,
  SITE_COUNT:   10,
  GROUP_COUNT:  10,
  REFRESH_SECS: 30
} as const;
