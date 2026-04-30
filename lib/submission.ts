import { ABIOTIC_FIELDS, MEADOW_LABELS, SPECIES } from "./constants";
import {
  bioticIndex,
  fmt,
  mean,
  simpsonsD,
  stdDev
} from "./calculations";
import { CONFIG } from "./config";
import type { SurveyState } from "./types";

export function buildPayload(state: SurveyState): Record<string, unknown> {
  const abMeans: Record<string, string> = {};
  for (const f of ABIOTIC_FIELDS) {
    abMeans[`${f.key}_mean`] = fmt(mean(state.ab[f.key]));
    abMeans[`${f.key}_sd`]   = fmt(stdDev(state.ab[f.key]));
  }
  const counts: Record<string, number> = {};
  for (const sp of SPECIES) counts[sp.id] = state.bio[sp.id] || 0;
  const cover: Record<string, string> = {};
  for (const l of MEADOW_LABELS) cover[`sp_${l}`] = state.mdw.cover[l] ?? "0";
  return {
    group:     state.group,
    site:      state.site,
    flow:      state.flow,
    timestamp: new Date().toISOString(),
    lat:       state.gps.lat,
    lng:       state.gps.lng,
    alt_m:     state.gps.alt,
    lux:       state.gps.lux,
    ...abMeans,
    biotic_index:    fmt(bioticIndex(state.bio)),
    simpsons_stream: fmt(simpsonsD(SPECIES.map((s) => state.bio[s.id])), 3),
    meadow_site:     state.mdw.site,
    simpsons_meadow: fmt(simpsonsD(MEADOW_LABELS.map((l) => state.mdw.cover[l] ?? "")), 3),
    ...counts,
    ...cover
  };
}

export async function submitToSheets(state: SurveyState): Promise<void> {
  await fetch(CONFIG.WEBHOOK_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildPayload(state))
  });
}
