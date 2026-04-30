// Goodness-of-fit chi-squared, 1x2 (df=1).
// Tests H0: counts in habitat A and B are equal.
// Critical value at p=0.05, df=1 is 3.84.

import type { ClassRow } from "./useClassData";
import { MEADOW_LABELS, SPECIES, type SpeciesId } from "./constants";

export const CRITICAL_CHI = 3.84;

export type Habitat = "stream" | "meadow";

export type ChiInput = {
  habitat: Habitat;
  speciesId: string;          // SpeciesId for stream, A-P for meadow
};

export type ChiResult =
  | { kind: "ok"; oA: number; oB: number; eA: number; eB: number; chi: number; nA: number; nB: number; labelA: string; labelB: string; reject: boolean; warnLowExpected: boolean }
  | { kind: "needData"; reason: string; labelA: string; labelB: string; nA: number; nB: number };

function num(v: unknown): number {
  const n = parseFloat(String(v));
  return Number.isNaN(n) ? 0 : n;
}

// Aggregate observed counts of one species across all class submissions,
// split by habitat type.
export function aggregate(
  rows: ClassRow[],
  habitat: Habitat,
  speciesId: string
): { oA: number; oB: number; nA: number; nB: number; labelA: string; labelB: string } {
  if (habitat === "stream") {
    const a = rows.filter((r) => String(r.flow) === "riffle");
    const b = rows.filter((r) => String(r.flow) === "pool");
    const oA = a.reduce((s, r) => s + num(r[speciesId]), 0);
    const oB = b.reduce((s, r) => s + num(r[speciesId]), 0);
    return { oA, oB, nA: a.length, nB: b.length, labelA: "Riffle", labelB: "Pool" };
  }
  // meadow: % cover -> quadrat-square count (each square = 4%)
  const a = rows.filter((r) => String(r.meadow_site) === "marsh");
  const b = rows.filter((r) => String(r.meadow_site) === "drained");
  const key = `sp_${speciesId}`;
  const oA = a.reduce((s, r) => s + Math.round(num(r[key]) / 4), 0);
  const oB = b.reduce((s, r) => s + Math.round(num(r[key]) / 4), 0);
  return { oA, oB, nA: a.length, nB: b.length, labelA: "Marsh", labelB: "Drained" };
}

export function chiSquared(rows: ClassRow[], input: ChiInput): ChiResult {
  const { oA, oB, nA, nB, labelA, labelB } = aggregate(rows, input.habitat, input.speciesId);
  if (nA < 2 || nB < 2) {
    return {
      kind: "needData",
      reason: "need at least 2 submissions in each habitat",
      labelA, labelB, nA, nB
    };
  }
  if (oA + oB === 0) {
    return {
      kind: "needData",
      reason: "no observations of this species yet",
      labelA, labelB, nA, nB
    };
  }
  const eA = (oA + oB) / 2;
  const eB = (oA + oB) / 2;
  const chi = ((oA - eA) ** 2) / eA + ((oB - eB) ** 2) / eB;
  return {
    kind: "ok",
    oA, oB, eA, eB, chi, nA, nB, labelA, labelB,
    reject: chi > CRITICAL_CHI,
    warnLowExpected: eA < 5 || eB < 5
  };
}

// list of species the user can pick from, given the habitat
export function speciesOptions(habitat: Habitat): { id: string; label: string }[] {
  if (habitat === "stream") {
    return SPECIES.map((s) => ({ id: s.id as SpeciesId, label: s.name }));
  }
  return MEADOW_LABELS.map((l) => ({ id: l, label: `Species ${l}` }));
}
