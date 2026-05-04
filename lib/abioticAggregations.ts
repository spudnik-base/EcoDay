import type { ParsedRow } from "./parseRow";
import { meanSd, type MeanSd } from "./aggregations";

export type FactorKey =
  | "velocity"
  | "width"
  | "depth"
  | "ph"
  | "temp"
  | "nitrate";

export const FACTORS: ReadonlyArray<{
  key: FactorKey;
  label: string;
  unit: string;
}> = [
  { key: "velocity", label: "Velocity", unit: "m/s" },
  { key: "width",    label: "Width",    unit: "cm"  },
  { key: "depth",    label: "Depth",    unit: "cm"  },
  { key: "ph",       label: "pH",       unit: ""    },
  { key: "temp",     label: "Temp",     unit: "°C" },
  { key: "nitrate",  label: "Nitrate",  unit: "ppm" }
];

function values(rows: ParsedRow[], key: FactorKey): number[] {
  return rows.map((r) => r[key]).filter((n) => !Number.isNaN(n));
}

// Mean and SD of one abiotic factor at each site (1..siteCount).
export function abioticPerSite(
  rows: ParsedRow[],
  key: FactorKey,
  siteCount: number
): MeanSd[] {
  const out: MeanSd[] = [];
  for (let s = 1; s <= siteCount; s++) {
    const matching = rows.filter((r) => r.site === s);
    out.push(meanSd(values(matching, key)));
  }
  return out;
}

// Mean and SD of one abiotic factor for riffle and pool submissions.
export function abioticByFlow(rows: ParsedRow[], key: FactorKey) {
  const riffle = rows.filter((r) => r.flow === "riffle");
  const pool   = rows.filter((r) => r.flow === "pool");
  return {
    riffle: meanSd(values(riffle, key)),
    pool:   meanSd(values(pool, key))
  };
}

// One point per site: mean abiotic and mean BI at that site, used for
// scatter plots (abiotic vs biotic index).
export type SitePoint = { site: number; ab: number; bi: number; n: number };

export function siteAbioticVsBi(
  rows: ParsedRow[],
  key: FactorKey,
  siteCount: number
): SitePoint[] {
  const out: SitePoint[] = [];
  for (let s = 1; s <= siteCount; s++) {
    const matching = rows.filter((r) => r.site === s);
    const abM = meanSd(values(matching, key));
    const biM = meanSd(matching.map((r) => r.bi).filter((n) => !Number.isNaN(n)));
    if (abM.mean === null || biM.mean === null) continue;
    out.push({ site: s, ab: abM.mean, bi: biM.mean, n: matching.length });
  }
  return out;
}
