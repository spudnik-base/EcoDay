import type { ParsedRow } from "./parseRow";

export type MeanSd = {
  mean: number | null;
  sd:   number | null;
  n:    number;
};

export function meanSd(values: number[]): MeanSd {
  const ns = values.filter((v) => !Number.isNaN(v));
  if (!ns.length) return { mean: null, sd: null, n: 0 };
  const m = ns.reduce((a, b) => a + b, 0) / ns.length;
  if (ns.length < 2) return { mean: m, sd: null, n: ns.length };
  const variance = ns.reduce((a, b) => a + (b - m) ** 2, 0) / (ns.length - 1);
  return { mean: m, sd: Math.sqrt(variance), n: ns.length };
}

export function streamDiversityStats(rows: ParsedRow[]): MeanSd {
  return meanSd(rows.map((r) => r.dStream));
}

export function meadowDiversityByHabitat(rows: ParsedRow[]) {
  const marsh   = rows.filter((r) => r.meadow_site === "marsh");
  const drained = rows.filter((r) => r.meadow_site === "drained");
  return {
    marsh:   meanSd(marsh.map((r) => r.dMeadow)),
    drained: meanSd(drained.map((r) => r.dMeadow))
  };
}

export function biByFlow(rows: ParsedRow[]) {
  const riffle = rows.filter((r) => r.flow === "riffle");
  const pool   = rows.filter((r) => r.flow === "pool");
  return {
    riffle: meanSd(riffle.map((r) => r.bi)),
    pool:   meanSd(pool.map((r) => r.bi))
  };
}

export function biPerSite(rows: ParsedRow[], siteCount: number): MeanSd[] {
  const out: MeanSd[] = [];
  for (let s = 1; s <= siteCount; s++) {
    const matching = rows.filter((r) => r.site === s);
    out.push(meanSd(matching.map((r) => r.bi)));
  }
  return out;
}

export function abioticStats(rows: ParsedRow[]) {
  return {
    ph:      meanSd(rows.map((r) => r.ph)),
    temp:    meanSd(rows.map((r) => r.temp)),
    nitrate: meanSd(rows.map((r) => r.nitrate))
  };
}
