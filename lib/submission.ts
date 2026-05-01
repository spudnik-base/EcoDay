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

// Stream payload keeps its existing wide shape so it stays compatible with
// the headers already present in the stream sheet. The meadow payload is
// trimmed to only meadow-relevant keys: a fresh meadow sheet writes its
// own clean headers from those keys on the first submission.

function filledAbiotic(state: SurveyState): Record<string, string> {
  const out: Record<string, string> = {};
  for (const f of ABIOTIC_FIELDS) {
    out[`${f.key}_mean`] = fmt(mean(state.ab[f.key]));
    out[`${f.key}_sd`]   = fmt(stdDev(state.ab[f.key]));
  }
  return out;
}

function emptyAbiotic(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const f of ABIOTIC_FIELDS) {
    out[`${f.key}_mean`] = "";
    out[`${f.key}_sd`]   = "";
  }
  return out;
}

function filledCounts(state: SurveyState): Record<string, number> {
  const out: Record<string, number> = {};
  for (const sp of SPECIES) out[sp.id] = state.bio[sp.id] || 0;
  return out;
}

function emptyCounts(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const sp of SPECIES) out[sp.id] = "";
  return out;
}

function filledCover(state: SurveyState): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of MEADOW_LABELS) out[`sp_${l}`] = state.mdw.cover[l] ?? "0";
  return out;
}

function emptyCover(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of MEADOW_LABELS) out[`sp_${l}`] = "";
  return out;
}

// Stream payload: kept wide for compatibility with the existing stream
// sheet headers (which include meadow_site, simpsons_meadow, sp_A..sp_P
// columns from earlier mixed-shape submissions). Empties pad the unused
// half so column alignment never shifts.
export function buildStreamPayload(state: SurveyState): Record<string, unknown> {
  return {
    group:     state.group,
    site:      state.site,
    flow:      state.flow,
    timestamp: new Date().toISOString(),
    lat:       state.gps.lat,
    lng:       state.gps.lng,
    alt_m:     state.gps.alt,
    lux:       state.gps.lux,
    ...filledAbiotic(state),
    biotic_index:    fmt(bioticIndex(state.bio)),
    simpsons_stream: fmt(simpsonsD(SPECIES.map((s) => state.bio[s.id])), 3),
    meadow_site:     "",
    simpsons_meadow: "",
    ...filledCounts(state),
    ...emptyCover(),
    submission_type: "stream"
  };
}

// Meadow payload: slim. Only the keys that mean something for a meadow
// quadrat. The meadow sheet's headers will be set by these keys when the
// sheet is empty.
export function buildMeadowPayload(state: SurveyState): Record<string, unknown> {
  return {
    group:           state.group,
    timestamp:       new Date().toISOString(),
    lat:             state.gps.lat,
    lng:             state.gps.lng,
    alt_m:           state.gps.alt,
    meadow_site:     state.mdw.site,
    simpsons_meadow: fmt(simpsonsD(MEADOW_LABELS.map((l) => state.mdw.cover[l] ?? "")), 3),
    ...filledCover(state)
  };
}

// re-exported so the stream payload helpers can compile if anything imports
// them (kept for completeness; nothing references these directly).
export { emptyAbiotic, emptyCounts, emptyCover };

async function post(url: string, payload: Record<string, unknown>): Promise<void> {
  await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export async function submitStream(state: SurveyState): Promise<void> {
  await post(CONFIG.WEBHOOK_URL_STREAM, buildStreamPayload(state));
}

export async function submitMeadow(state: SurveyState): Promise<void> {
  await post(CONFIG.WEBHOOK_URL_MEADOW, buildMeadowPayload(state));
}
