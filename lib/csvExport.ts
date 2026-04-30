import { ABIOTIC_FIELDS, MEADOW_LABELS, SPECIES } from "./constants";
import { bioticIndex, fmt, mean, simpsonsD, stdDev } from "./calculations";
import type { SurveyState } from "./types";

export function buildCsv(state: SurveyState): string {
  const rows: string[][] = [["Field", "Value"]];
  rows.push(
    ["Group", state.group],
    ["Site", state.site],
    ["Flow", state.flow],
    ["GPS_lat", state.gps.lat ?? ""],
    ["GPS_lng", state.gps.lng ?? ""],
    ["Altitude_m", state.gps.alt ?? ""],
    ["Lux", state.gps.lux != null ? String(state.gps.lux) : ""]
  );
  for (const f of ABIOTIC_FIELDS) {
    state.ab[f.key].forEach((v, i) => rows.push([`${f.key}_${i + 1}`, v]));
    rows.push([`${f.key}_mean`, fmt(mean(state.ab[f.key]))]);
    rows.push([`${f.key}_sd`, fmt(stdDev(state.ab[f.key]))]);
  }
  for (const sp of SPECIES) rows.push([sp.name, String(state.bio[sp.id] || 0)]);
  rows.push(["Biotic_index", fmt(bioticIndex(state.bio))]);
  rows.push(["Simpsons_D_stream", fmt(simpsonsD(SPECIES.map((s) => state.bio[s.id])), 3)]);
  rows.push(["Meadow_site", state.mdw.site]);
  rows.push([
    "Simpsons_D_meadow",
    fmt(simpsonsD(MEADOW_LABELS.map((l) => state.mdw.cover[l] ?? "")), 3)
  ]);
  for (const l of MEADOW_LABELS) rows.push([`sp_${l}`, state.mdw.cover[l] ?? "0"]);
  return rows.map((r) => r.map(cell => csvEscape(cell)).join(",")).join("\n");
}

function csvEscape(v: string): string {
  if (/[,"\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

export function downloadCsv(state: SurveyState) {
  const csv = buildCsv(state);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = `survey_g${state.group || "x"}_s${state.site || "x"}.csv`;
  a.click();
}
