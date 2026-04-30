# EcoDay

Field-day survey app for IB Biology / ESS stream and meadow ecology.
Two routes:

- `/` student survey app, mobile-first, installable as a PWA
- `/dashboard` teacher dashboard, live class results

Data is submitted to a Google Sheet via a Google Apps Script web app.

## Year-to-year rollover

Everything that changes year-to-year is in `lib/config.ts`. The webhook URL
is intentionally hardcoded so students cannot break it from the UI.

1. Create a fresh Google Sheet for the new cohort.
2. In the sheet, open `Extensions > Apps Script`. Replace the contents with
   the script in [Apps Script](#apps-script) below. Click `Deploy > New
   deployment > Web app`. Set:
    - Execute as: Me
    - Who has access: Anyone
   Click Deploy. Copy the resulting `/exec` URL.
3. Edit `lib/config.ts`:
    - Replace `WEBHOOK_URL` with the new URL.
    - Bump `YEAR`.
4. Commit and push to the deployment branch. Vercel rebuilds automatically.

That's it. No environment variables, no admin UI, no shared password.

## Apps Script

Paste this into `Extensions > Apps Script` of the receiving Google Sheet:

```js
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) sheet.appendRow(Object.keys(data));
    sheet.appendRow(Object.values(data));
    return ContentService.createTextOutput("OK");
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.message);
  }
}

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    return ContentService.createTextOutput("[]")
      .setMimeType(ContentService.MimeType.JSON);
  }
  const headers = data[0];
  const rows = data.slice(1).map(row =>
    Object.fromEntries(headers.map((h, i) => [h, row[i]]))
  );
  return ContentService.createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Deploy

1. Push to GitHub. Connect the repo to Vercel.
2. No environment variables needed; the webhook URL is in code.
3. Vercel auto-deploys on push to the deployment branch.

Two URLs to share with the field day:

- Students: `<project>.vercel.app/`
- Teacher dashboard: `<project>.vercel.app/dashboard`

HTTPS is required for the Geolocation and AmbientLightSensor APIs. Vercel
provides this by default.

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000 for the survey, http://localhost:3000/dashboard
for the dashboard.

## What goes where

```
app/
  layout.tsx, globals.css
  page.tsx                  /
  dashboard/page.tsx        /dashboard
components/
  shared/                   Header, Mountains (decoupage), TabBar
  ui/                       Card, Button, Field, Stepper, NumGrid, ...
  survey/                   SiteTab, AbioticTab, BioticTab, MeadowTab,
                            ResultsTab, ChiSquaredTab and small subcomponents
  dashboard/                OverviewTab, SitesTab, CompareTab, DataTable
                            and chart subcomponents
lib/
  config.ts                 EDIT THIS FOR YEAR ROLLOVER
  constants.ts              species list, abiotic fields, meadow labels
  types.ts                  SurveyState, Quality, SensorStatus
  calculations.ts           mean, sd, biotic index, Simpson's, quality
  storage.ts                localStorage helpers
  csvExport.ts              build + download CSV
  submission.ts             build + POST payload
  useSurveyState.ts         survey state hook
  useClassData.ts           dashboard data fetch hook
  parseRow.ts               numeric coercion of webhook rows
  chiSquared.ts             goodness-of-fit calc and aggregation
public/
  manifest.webmanifest, sw.js, icon*.svg, icon*.png
```

## Offline

Survey data is saved to `localStorage` on every change, so closing the tab
or losing signal mid-collection never loses data. Submission requires
network. If submit fails, students can `Export CSV` and the teacher can
import it later.

## PWA

Add to home screen on iOS or install on Chrome. App shell is cached by the
service worker (`public/sw.js`) using stale-while-revalidate; the webhook is
never cached.
