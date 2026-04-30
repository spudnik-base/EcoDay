import type { ClassRow } from "./useClassData";

export type ParsedRow = {
  group: number;
  site: number;
  flow: string;
  bi: number;
  dStream: number;
  dMeadow: number;
  alt: number;
  lux: number;
  ph: number;
  temp: number;
  nitrate: number;
  velocity: number;
  width: number;
  depth: number;
  meadow_site: string;
  timestamp: string;
  raw: ClassRow;
};

function num(v: unknown): number {
  const n = parseFloat(String(v));
  return Number.isNaN(n) ? NaN : n;
}

export function parseRow(r: ClassRow): ParsedRow {
  return {
    group:       parseInt(String(r.group ?? "")),
    site:        parseInt(String(r.site ?? "")),
    flow:        String(r.flow ?? ""),
    bi:          num(r.biotic_index),
    dStream:     num(r.simpsons_stream),
    dMeadow:     num(r.simpsons_meadow),
    alt:         num(r.alt_m),
    lux:         num(r.lux),
    ph:          num(r.ph_mean),
    temp:        num(r.temp_mean),
    nitrate:     num(r.nitrate_mean),
    velocity:    num(r.velocity_mean),
    width:       num(r.width_mean),
    depth:       num(r.depth_mean),
    meadow_site: String(r.meadow_site ?? ""),
    timestamp:   String(r.timestamp ?? ""),
    raw:         r
  };
}
