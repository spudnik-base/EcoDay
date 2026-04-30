import { ABIOTIC_FIELDS, MEADOW_LABELS, SPECIES } from "./constants";
import type { SurveyState } from "./types";

export const STORAGE_KEY = "ecoday_survey_v1";

export function initialState(): SurveyState {
  return {
    group: "",
    site: "",
    flow: "riffle",
    gps: {
      lat: null,
      lng: null,
      alt: null,
      lux: null,
      gpsStatus: "idle",
      luxStatus: "idle"
    },
    ab: Object.fromEntries(
      ABIOTIC_FIELDS.map((f) => [f.key, ["", "", ""]])
    ) as SurveyState["ab"],
    bio: Object.fromEntries(
      SPECIES.map((s) => [s.id, 0])
    ) as SurveyState["bio"],
    mdw: {
      site: "marsh",
      cover: Object.fromEntries(MEADOW_LABELS.map((l) => [l, ""]))
    }
  };
}

export function loadState(): SurveyState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SurveyState;
  } catch {
    return null;
  }
}

export function saveState(state: SurveyState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // quota or disabled; ignore
  }
}
