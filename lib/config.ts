// EcoDay configuration. Edit these at the start of each year and redeploy.
//
// Year-rollover checklist:
//   1. Create a new Google Sheet for the new cohort.
//   2. Open Extensions > Apps Script, paste the script (see README), deploy as
//      a new web app (Execute as: Me, Access: Anyone).
//   3. Replace WEBHOOK_URL below with the new deployment URL.
//   4. Bump YEAR.
//   5. Commit and push. Vercel auto-deploys.
export const CONFIG = {
  WEBHOOK_URL:
    "https://script.google.com/macros/s/AKfycbyf8etVUXXtA5XNlfZ4KGCkDpCxN15hdCTeWt1HcElTS2RXMEv1DG3RqdLFU0CYjRyqFA/exec",
  YEAR:         2026,
  SITE_COUNT:   10,
  GROUP_COUNT:  10,
  REFRESH_SECS: 30
} as const;
