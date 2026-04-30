# Leysin Stream Survey — Project Spec for Claude Code

## Overview

A two-part web application for an IB Biology / ESS field day at Leysin American School, Switzerland. Students collect ecological data from a local stream and alpine meadow. Data submits live to a shared Google Sheet. A separate teacher dashboard displays class results in real time.

Built with Next.js, deployed on Vercel. Webhook URL and config stored in environment variables.

---

## Project structure

```
leysin-survey/
├── app/
│   ├── page.tsx               # student survey app (/)
│   ├── dashboard/
│   │   └── page.tsx           # teacher dashboard (/dashboard)
│   └── layout.tsx
├── components/
│   ├── survey/
│   │   ├── SiteTab.tsx
│   │   ├── AbioticTab.tsx
│   │   ├── BioticTab.tsx
│   │   ├── MeadowTab.tsx
│   │   └── ResultsTab.tsx
│   ├── dashboard/
│   │   ├── OverviewTab.tsx
│   │   ├── SitesTab.tsx
│   │   ├── CompareTab.tsx
│   │   └── DataTable.tsx
│   └── shared/
│       ├── DentsDuMidi.tsx    # SVG mountain header
│       ├── TabBar.tsx
│       └── NavHeader.tsx
├── lib/
│   ├── constants.ts           # species list, abiotic fields, meadow labels
│   ├── calculations.ts        # biotic index, Simpson's D, mean, SD
│   ├── types.ts               # TypeScript interfaces
│   └── storage.ts             # localStorage helpers
├── .env.local                 # WEBHOOK_URL (never committed)
├── .env.example               # template for the above
└── SPEC.md                    # this file
```

---

## Environment variables

```bash
# .env.local
NEXT_PUBLIC_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

```bash
# .env.example  (commit this, not .env.local)
NEXT_PUBLIC_WEBHOOK_URL=
```

In Vercel dashboard: Settings → Environment Variables → add `NEXT_PUBLIC_WEBHOOK_URL`.

---

## Config — edit this each year

All year-specific values live in one place: `lib/constants.ts`

```ts
export const CONFIG = {
  YEAR:          2026,
  SCHOOL:        "Leysin American School",
  SITE_COUNT:    10,
  GROUP_COUNT:   10,
  REFRESH_SECS:  30,   // dashboard auto-refresh interval
};
```

Nothing else should need changing year to year.

---

## Data model

### Survey state (persisted to localStorage)

```ts
interface SurveyState {
  group:   string;          // "1"–"10"
  site:    string;          // "1"–"10"
  flow:    "riffle" | "pool";
  gps: {
    lat:       string | null;
    lng:       string | null;
    alt:       string | null;   // metres, from Geolocation API
    lux:       number | null;   // from AmbientLightSensor API
    gpsStatus: SensorStatus;
    luxStatus: SensorStatus;
  };
  abiotic: Record<AbioticKey, [string, string, string]>;  // 3 readings each
  biotic:  Record<SpeciesId, number>;                     // count per species
  meadow: {
    site:  "marsh" | "drained";
    cover: Record<string, string>;  // A–P, % cover
  };
}

type SensorStatus = "idle" | "loading" | "ok" | "error" | "unsupported";
```

### Row submitted to Google Sheets

```ts
interface SubmissionRow {
  group:              string;
  site:               string;
  flow:               string;
  timestamp:          string;   // ISO 8601
  lat:                string | null;
  lng:                string | null;
  alt_m:              string | null;
  lux:                number | null;
  // abiotic means and SDs
  velocity_mean:      string;
  velocity_sd:        string;
  width_mean:         string;
  width_sd:           string;
  depth_mean:         string;
  depth_sd:           string;
  ph_mean:            string;
  ph_sd:              string;
  temp_mean:          string;
  temp_sd:            string;
  nitrate_mean:       string;
  nitrate_sd:         string;
  // biotic counts
  stonefly:           number;
  mayfly:             number;
  uncased:            number;
  cased:              number;
  riffle:             number;
  waterpenny:         number;
  flatworm:           number;
  damsel:             number;
  blackfly:           number;
  beetle:             number;
  snail:              number;
  shrimp:             number;
  leech:              number;
  segworm:            number;
  // calculated
  biotic_index:       string;
  simpsons_stream:    string;
  // meadow
  meadow_site:        string;
  simpsons_meadow:    string;
  sp_A: string; sp_B: string; sp_C: string; sp_D: string;
  sp_E: string; sp_F: string; sp_G: string; sp_H: string;
  sp_I: string; sp_J: string; sp_K: string; sp_L: string;
  sp_M: string; sp_N: string; sp_O: string; sp_P: string;
}
```

---

## Species list (`lib/constants.ts`)

```ts
export const SPECIES = [
  { id: "stonefly",   name: "Stonefly nymph",        tol: 10 },
  { id: "mayfly",     name: "Mayfly nymph",           tol: 10 },
  { id: "uncased",    name: "Uncased caddisfly",      tol: 10 },
  { id: "cased",      name: "Cased caddisfly",        tol: 10 },
  { id: "riffle",     name: "Riffle beetle",          tol: 10 },
  { id: "waterpenny", name: "Water penny",            tol: 10 },
  { id: "flatworm",   name: "Flat worm",              tol: 8  },
  { id: "damsel",     name: "Damselfly nymph",        tol: 8  },
  { id: "blackfly",   name: "Fly / black fly larvae", tol: 8  },
  { id: "beetle",     name: "Beetle larvae",          tol: 6  },
  { id: "snail",      name: "Snail",                  tol: 6  },
  { id: "shrimp",     name: "Shrimp / scud",          tol: 6  },
  { id: "leech",      name: "Leech",                  tol: 3  },
  { id: "segworm",    name: "Segmented worm",         tol: 2  },
];

export const ABIOTIC_FIELDS = [
  { key: "velocity", label: "Velocity", unit: "m/s" },
  { key: "width",    label: "Width",    unit: "cm"  },
  { key: "depth",    label: "Depth",    unit: "cm"  },
  { key: "ph",       label: "pH",       unit: ""    },
  { key: "temp",     label: "Temp",     unit: "°C"  },
  { key: "nitrate",  label: "Nitrate",  unit: "ppm" },
];

export const MEADOW_LABELS = "ABCDEFGHIJKLMNOP".split("");
```

---

## Calculations (`lib/calculations.ts`)

```ts
// arithmetic mean of up to 3 string readings, ignoring blanks
export function mean(readings: string[]): number | null

// sample standard deviation of the same
export function stdDev(readings: string[]): number | null

// biotic index = Σ(n × tolerance) / N
export function bioticIndex(
  counts: Record<string, number>,
  species: typeof SPECIES
): number | null

// Simpson's diversity index D = 1 - Σ(n(n-1)) / N(N-1)
export function simpsonsD(values: (string | number)[]): number | null

// water quality label from biotic index
export function qualityLabel(bi: number | null): {
  text: string;
  bg:   string;
  fg:   string;
} | null
```

---

## Student survey app (`/`)

### Layout
- Full-height mobile-first layout, max-width 460px, centred
- Sticky header with Dents du Midi SVG mountain silhouette (see below)
- Tab bar: Site / Abiotic / Biotic / Meadow / Results
- Data persists to localStorage on every change, key `leysin_survey_v1`
- On mount, rehydrate from localStorage

### Tab: Site
- **Group selector** — tap grid, numbers 1–10, dark navy when selected
- **Stream site selector** — same, numbers 1–10
- **Flow type** — two-button toggle: riffle / pool
- **Auto-captured sensors** — two rows:
  - Altitude (GPS): "capture" button calls `navigator.geolocation.getCurrentPosition` with `enableHighAccuracy: true`. Also captures lat/lng silently (for ArcGIS). Shows result in metres.
  - Ambient light (lux): "capture" calls `new AmbientLightSensor()`. Gracefully degrades with "not on this device" if API unavailable (iOS).
  - Both show a "re-read" button once captured
  - GPS coordinates shown in small text below: "46.342156, 7.001234 — logged for ArcGIS"
- **Google Sheets webhook** — collapsible section, shows the URL from `NEXT_PUBLIC_WEBHOOK_URL` as read-only confirmation text. No editing needed in the app.
- **Reset button** — clears all data for next group, preserves webhook

### Tab: Abiotic
- One card per abiotic factor (6 total)
- Three number inputs per card, side by side
- Mean (x̄) and SD (±) shown live in the card header as values are entered
- Inputs: `type="number"`, `step="0.01"`, no spinners

### Tab: Biotic
- Single card, one row per species (14 total)
- Each row: species name + tolerance badge (colour-coded) + stepper (+/−/count)
- Stepper: minus button, count display, plus button — joined as a single control
- Count display turns teal background when > 0
- Tolerance badge colours:
  - tol 10: green background
  - tol 8: blue background  
  - tol 6: amber background
  - tol 2–3: red background

### Tab: Meadow
- Site type toggle: "Marsh (ungrazed)" / "Drained (grazed)" — green when selected
- 2-column grid of A–P species, each with a number input for % cover
- Inputs turn green background when filled
- Note: "Each quadrat square = 4%"

### Tab: Results
- **Biotic index** — large number (52px), quality badge below
  - > 10: green — "Good — clean stream"
  - 3–10: amber — "Average — some pollution"
  - 0–2: red — "Poor — gross pollution"
  - Formula note: "Σ(n × tolerance) ÷ N total organisms"
- **Simpson's D** — two stat cards side by side: stream and meadow
- **Altitude + Lux** — two stat cards, only shown if captured
- **Abiotic summary table** — 3 columns: factor, mean, ±SD
- **Species found** — list of non-zero counts
- **Export CSV** button — downloads `leysin_gX_sY.csv` with all raw data
- **Submit to Google Sheets** button — POST to webhook, shows success/fail state

### CSV export fields
Group, Site, Flow, GPS_lat, GPS_lng, Altitude_m, Lux, all abiotic readings + means + SDs, all species counts, Biotic_index, Simpsons_D_stream, Meadow_site, Simpsons_D_meadow, all species % cover

### Submission (POST to webhook)
Send JSON body matching `SubmissionRow` interface above. Use `mode: "no-cors"` — response will be opaque, so treat any non-throw as success.

---

## Dashboard (`/dashboard`)

Auto-refreshes every `CONFIG.REFRESH_SECS` seconds via `setInterval`. Fetches from the same webhook URL using GET. Shows a countdown to next refresh. "Refresh now" button.

Status bar shows: `3 submissions — last updated 10:24:15`

### Header
Same Dents du Midi SVG header as survey app, same navy colour. Title: "Stream survey [YEAR] — Class dashboard". Average biotic index badge top right once data arrives.

### Tab: Overview
- **4 stat cards**: Groups submitted / of N, Class avg biotic index, Avg Simpson's D, Sites covered / of N
- **Bar chart** — biotic index per site (sites 1–10 on x-axis). Bars coloured by quality. Empty sites shown as flat grey. Dashed reference lines at BI=10 and BI=3 with labels.

### Tab: Sites
- 5×2 grid of site tiles (or 2×5 on mobile)
- Each tile shows: site number, biotic index (large), flow type, group number
- Tile background colour matches quality (green/amber/red)
- Empty sites shown in light grey with "—"

### Tab: Compare
Three sections:

1. **Pool vs riffle** — horizontal bar chart comparing average biotic index. Shows n= for each.

2. **Simpson's D by site** — bar chart, bars coloured by value (green >0.7, amber 0.4–0.7, red <0.4)

3. **Altitude vs biotic index** — inline SVG scatter plot. X=altitude, Y=biotic index. Points labelled with site number, coloured by quality. Dashed reference line at BI=10. Only shown when ≥3 sites have GPS data.

### Tab: All data
Full sortable table with columns: Group, Site, Flow, Biotic index, Simpson's D, Alt (m), Lux, pH, Temp, Nitrate, Time. Sorted by site number ascending. Biotic index shown as coloured pill.

---

## Google Apps Script (backend)

This runs in the Google Sheet at Tools → Extensions → Apps Script. Both functions must be present and the script deployed as a web app (Execute as: Me, Access: Anyone).

```js
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) sheet.appendRow(Object.keys(data));
    sheet.appendRow(Object.values(data));
    return ContentService.createTextOutput("OK");
  } catch(err) {
    return ContentService.createTextOutput("Error: " + err.message);
  }
}

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    return ContentService
      .createTextOutput("[]")
      .setMimeType(ContentService.MimeType.JSON);
  }
  const headers = data[0];
  const rows = data.slice(1).map(row =>
    Object.fromEntries(headers.map((h, i) => [h, row[i]]))
  );
  return ContentService
    .createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON);
}
```

After pasting, deploy: Deploy → New deployment → Web app → Execute as Me → Access Anyone → Deploy. Copy the URL into Vercel's environment variable.

---

## Visual design

### Colours
```ts
const NAVY     = "#0B1C35";   // header background
const SNOW     = "#E8EDF5";   // header text, mountain silhouette
const TEAL     = "#1D9E75";   // primary action, stream data
const TEAL_L   = "#E1F5EE";   // teal light background
const TEAL_D   = "#085041";   // teal dark text
const TEAL_M   = "#5DCAA5";   // teal mid (active tab indicator, sub-header text)
const GREEN    = "#4B7A1E";   // meadow data
const GREEN_L  = "#EAF3DE";
const GREEN_D  = "#27500A";
```

### Typography
System font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Dents du Midi SVG
The mountain header is a 4-layer SVG silhouette of the Dents du Midi range (visible from the field site). Four `<path>` elements at increasing opacity (0.12, 0.30, 0.65, 1.0) create a layered depth effect with SNOW fill. ViewBox `0 0 380 72` for the survey app, `0 0 900 72` for the wider dashboard. `preserveAspectRatio="none"` so it fills the header width. Placed directly above the tab bar with `margin-bottom: -2px`.

The final (opaque) path approximates the 7-peak profile of the range. Keep all 4 paths — removing any breaks the depth effect.

### Cards
- Background: white
- Border: `0.5px solid #ddd`
- Border radius: 12px
- Padding: 12px 14px

### Inputs
- Height: 40px
- Border: `0.5px solid #ccc`, focus: `#1D9E75`
- Border radius: 8px
- No number spinners
- Centred text for data entry inputs

### Stepper control (biotic tab)
Three joined elements — minus button (left-rounded), count display (centre), plus button (right-rounded). Count display turns teal when > 0.

---

## Offline / connectivity notes

- All survey data saves to localStorage on every change
- If a student closes the tab, data is fully restored on reopen
- Submit button requires connectivity — if offline, "Export CSV" is the fallback
- GPS and light sensor require the device to prompt for permissions on first use — brief students to tap "Allow" when prompted
- AmbientLightSensor API is not available on iOS Safari (any version). Show "not on this device" gracefully, do not error.
- Dashboard requires connectivity to fetch data

---

## Vercel deployment

```bash
npx create-next-app@latest leysin-survey --typescript --tailwind --app
cd leysin-survey
# add components and pages per structure above
# add .env.local with webhook URL
vercel deploy
```

Set `NEXT_PUBLIC_WEBHOOK_URL` in Vercel dashboard under Settings → Environment Variables for production.

Two URLs to share:
- Students: `https://leysin-survey.vercel.app`
- Teacher dashboard: `https://leysin-survey.vercel.app/dashboard`

Or use a custom domain if the school has one.

---

## Year-to-year maintenance checklist

- [ ] Change `CONFIG.YEAR` in `lib/constants.ts`
- [ ] Create a new Google Sheet for the new cohort
- [ ] Paste Apps Script into new sheet, redeploy, copy new URL
- [ ] Update `NEXT_PUBLIC_WEBHOOK_URL` in Vercel dashboard
- [ ] Push any species/abiotic changes to `lib/constants.ts`
- [ ] Done

---

## Context: what this is for

IB Biology (new syllabus 2023+) and ESS field day. Groups of 2–3 students work at one of 10 sites along a stream near Leysin, Switzerland. They collect:

- **Abiotic**: velocity, width, depth, pH, temperature, nitrate (3 readings each → mean + SD)
- **Biotic**: kick sample — count of 14 macroinvertebrate species
- **Sensors**: GPS altitude and ambient lux (auto-captured by phone)
- **Meadow**: random quadrat % cover of up to 16 plant species at marsh vs drained site

Calculated outputs:
- **Biotic index** = Σ(n × pollution tolerance) / N — measures water quality
- **Simpson's D** = 1 - Σ(n(n-1)) / N(N-1) — measures biodiversity
- **Standard deviation** of each abiotic factor across 3 readings

Data feeds into ArcGIS Survey123 (citizen science archive) and is used for IA research questions including: correlation of nitrate vs biotic index, altitude vs biotic index, pool vs riffle comparison, marsh vs drained meadow diversity.

Syllabus coverage: C4.1 (sampling, diversity indices, chi-squared), C4.2 (food webs, energy transfer), D4.3 (climate change — carbon in wetlands).
