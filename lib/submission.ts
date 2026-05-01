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

// Both submission payloads are emitted with the same key shape and order so
// they line up with the original Apps Script (which appends to fixed
// columns). The half that does not apply is left as empty strings so the
// dashboard's NaN-aware aggregations skip those rows naturally.

function commonShell(state: SurveyState) {
  return {
    group:     state.group,
    site:      state.site,
    flow:      state.flow,
    timestamp: new Date().toISOString(),
    lat:       state.gps.lat,
    lng:       state.gps.lng,
    alt_m:     state.gps.alt,
    lux:       state.gps.lux
  };
}

function emptyAbiotic(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const f of ABIOTIC_FIELDS) {
    out[`${f.key}_mean`] = "";
    out[`${f.key}_sd`]   = "";
  }
  return out;
}

function filledAbiotic(state: SurveyState): Record<string, string> {
  const out: Record<string, string> = {};
  for (const f of ABIOTIC_FIELDS) {
    out[`${f.key}_mean`] = fmt(mean(state.ab[f.key]));
    out[`${f.key}_sd`]   = fmt(stdDev(state.ab[f.key]));
  }
  return out;
}

function emptyCounts(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const sp of SPECIES) out[sp.id] = "";
  return out;
}

function filledCounts(state: SurveyState): Record<string, number> {
  const out: Record<string, number> = {};
  for (const sp of SPECIES) out[sp.id] = state.bio[sp.id] || 0;
  return out;
}

function emptyCover(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of MEADOW_LABELS) out[`sp_${l}`] = "";
  return out;
}

function filledCover(state: SurveyState): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of MEADOW_LABELS) out[`sp_${l}`] = state.mdw.cover[l] ?? "0";
  return out;
}

export function buildStreamPayload(state: SurveyState): Record<string, unknown> {
  return {
    ...commonShell(state),
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

export function buildMeadowPayload(state: SurveyState): Record<string, unknown> {
  return {
    group:     state.group,
    site:      "",            // meadow has no stream site
    flow:      "",
    timestamp: new Date().toISOString(),
    lat:       state.gps.lat,
    lng:       state.gps.lng,
    alt_m:     state.gps.alt,
    lux:       state.gps.lux,
    ...emptyAbiotic(),
    biotic_index:    "",
    simpsons_stream: "",
    meadow_site:     state.mdw.site,
    simpsons_meadow: fmt(simpsonsD(MEADOW_LABELS.map((l) => state.mdw.cover[l] ?? "")), 3),
    ...emptyCounts(),
    ...filledCover(state),
    submission_type: "meadow"
  };
}

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
