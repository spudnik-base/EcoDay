# EcoDay

Field-day survey app for IB Biology / ESS stream and meadow ecology.
Two routes:

- `/` student survey app, mobile-first, installable as a PWA
- `/dashboard` teacher dashboard, live class results

Data is submitted to a Google Sheet via a Google Apps Script web app.

## Year-to-year rollover

All year-specific config lives in `lib/config.ts`. The webhook URLs are
intentionally hardcoded so students cannot change them from the UI.

EcoDay uses **two Google Sheets**: one for stream data, one for meadow data.

1. Create two fresh Google Sheets for the new cohort: `EcoDay stream YEAR`
   and `EcoDay meadow YEAR`.
2. In each sheet, open `Extensions > Apps Script`. Paste the script from
   [Apps Script](#apps-script) below. Click `Deploy > New deployment > Web app`.
   Settings:
    - Execute as: Me
    - Who has access: Anyone

   Deploy and copy the resulting `/exec` URL. Repeat for the second sheet.
3. Edit `lib/config.ts`:
    - Set `WEBHOOK_URL_STREAM` to the stream sheet URL.
    - Set `WEBHOOK_URL_MEADOW` to the meadow sheet URL.
    - Bump `YEAR`.
4. Commit and push to the deployment branch. Vercel rebuilds automatically.

If you only have one Sheet for testing, point both URLs at it. The dashboard
tabs filter rows by which fields are populated, so stream and meadow rows
can co-exist in a single Sheet.

## Apps Script

Paste this into `Extensions > Apps Script` of the receiving Google Sheet.
This version aligns each row by header name, so adding new columns over
time (for example the `submission_type` field that distinguishes stream
from meadow rows) does not shift older data.

```js
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // existing headers (or none if sheet is empty)
    var headers = [];
    if (sheet.getLastRow() > 0) {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }

    // append any new keys to the header row
    var newKeys = Object.keys(data).filter(function (k) {
      return headers.indexOf(k) === -1;
    });
    if (newKeys.length > 0) {
      headers = headers.concat(newKeys);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    // build the row in header order, blanks for missing keys
    var row = headers.map(function (h) {
      return data[h] === undefined ? "" : data[h];
    });
    sheet.appendRow(row);

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

## Two submission types

Each survey produces two independent submissions tagged in a
`submission_type` column:

- **stream** — group, site, flow, GPS, abiotic readings, biotic counts,
  biotic index, Simpson&apos;s D for the stream.
- **meadow** — group, marsh-or-drained, Simpson&apos;s D for the meadow,
  percent cover for species A through P.

Workflow: stream survey at the river in the morning, tap **Submit
stream**. Walk to the meadow in the afternoon, tap **Submit meadow**.
Each submission appends one row. Both rows live in the same Sheet but
the dashboard charts filter by which fields are populated, so stream
charts only count stream rows and meadow charts only count meadow rows.

Each section has its own **Reset stream / Reset meadow** button so the
next group or next site can start with a clean slate without losing the
other half.

## Deploy

1. Push to GitHub. Connect the repo to Vercel.
2. No environment variables needed; the webhook URLs are in code.
3. Vercel auto-deploys on push to the deployment branch.

URLs to share:

- Students: `<project>.vercel.app/`
- Stream dashboard: `<project>.vercel.app/dashboard/stream`
- Meadow dashboard: `<project>.vercel.app/dashboard/meadow`
- Dashboard chooser: `<project>.vercel.app/dashboard`

The TopNav at the top of every page provides quick toggling between Survey,
Stream, and Meadow.

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
