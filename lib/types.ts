import type { AbioticKey, SpeciesId } from "./constants";

export type SensorStatus = "idle" | "loading" | "ok" | "error" | "unsupported";

export interface SurveyState {
  group: string;
  site:  string;
  flow:  "riffle" | "pool";
  gps: {
    lat: string | null;
    lng: string | null;
    alt: string | null;
    lux: number | null;
    gpsStatus: SensorStatus;
    luxStatus: SensorStatus;
  };
  ab:  Record<AbioticKey, [string, string, string]>;
  bio: Record<SpeciesId, number>;
  mdw: {
    site:  "marsh" | "drained";
    cover: Record<string, string>;
  };
}

export interface Quality {
  txt: string;
  bg:  string;
  fg:  string;
  border: string;
}
