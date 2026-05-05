// Per-row biodiversity metrics for the stream side. Class data has each
// species count as a top-level field (raw row), so all metrics work off
// row.raw[speciesId].

import { SPECIES } from "./constants";
import { meanSd, type MeanSd } from "./aggregations";
import type { ParsedRow } from "./parseRow";

function counts(row: ParsedRow): number[] {
  return SPECIES.map((s) => {
    const v = parseFloat(String(row.raw[s.id]));
    return Number.isNaN(v) ? 0 : v;
  });
}

// Number of species with count > 0 in a single submission.
export function rowRichness(row: ParsedRow): number {
  return counts(row).filter((n) => n > 0).length;
}

// Shannon's H = -sum(p * ln(p)) over species with n > 0.
export function rowShannonH(row: ParsedRow): number {
  const ns = counts(row).filter((n) => n > 0);
  const N = ns.reduce((a, b) => a + b, 0);
  if (N === 0) return 0;
  let h = 0;
  for (const n of ns) {
    const p = n / N;
    h -= p * Math.log(p);
  }
  return h;
}

// Pielou's evenness J = H / ln(S). NaN if S < 2 (can't be even with one
// species).
export function rowPielouEvenness(row: ParsedRow): number {
  const s = rowRichness(row);
  if (s < 2) return NaN;
  return rowShannonH(row) / Math.log(s);
}

// Existing simpsons_stream column from the submission gives D directly.
function rowSimpsonD(row: ParsedRow): number {
  return row.dStream;
}

function perSite(
  rows: ParsedRow[],
  siteCount: number,
  fn: (r: ParsedRow) => number
): MeanSd[] {
  const out: MeanSd[] = [];
  for (let s = 1; s <= siteCount; s++) {
    const matching = rows.filter((r) => r.site === s);
    out.push(
      meanSd(matching.map(fn).filter((n) => !Number.isNaN(n)))
    );
  }
  return out;
}

export type DiversityMetric = "simpson" | "richness" | "evenness";

export const DIVERSITY_METRICS: ReadonlyArray<{
  key: DiversityMetric;
  label: string;
  yLabel: string;
  yMax: number;
  decimals: number;
}> = [
  { key: "simpson",   label: "Simpson's D", yLabel: "D",       yMax: 1,  decimals: 2 },
  { key: "richness",  label: "Richness",    yLabel: "S",       yMax: 14, decimals: 1 },
  { key: "evenness",  label: "Evenness",    yLabel: "J",       yMax: 1,  decimals: 2 }
];

export function diversityPerSite(
  rows: ParsedRow[],
  metric: DiversityMetric,
  siteCount: number
): MeanSd[] {
  if (metric === "simpson") return perSite(rows, siteCount, rowSimpsonD);
  if (metric === "richness") return perSite(rows, siteCount, rowRichness);
  return perSite(rows, siteCount, rowPielouEvenness);
}
