import type { ClassRow } from "./useClassData";
import { MEADOW_LABELS } from "./constants";
import { meanSd, type MeanSd } from "./aggregations";

function num(v: unknown): number {
  const n = parseFloat(String(v));
  return Number.isNaN(n) ? NaN : n;
}

export function meadowRowsOnly(rows: ClassRow[]): ClassRow[] {
  return rows.filter((r) => {
    const m = String(r.meadow_site);
    return m === "marsh" || m === "drained";
  });
}

export type CoverByLetter = { letter: string; marsh: MeanSd; drained: MeanSd };

// For each species letter A-P, mean and SD of % cover across submissions,
// split by marsh / drained.
export function coverByLetterByHabitat(rows: ClassRow[]): CoverByLetter[] {
  const meadow = meadowRowsOnly(rows);
  const marsh   = meadow.filter((r) => String(r.meadow_site) === "marsh");
  const drained = meadow.filter((r) => String(r.meadow_site) === "drained");
  return MEADOW_LABELS.map((letter) => {
    const key = `sp_${letter}`;
    return {
      letter,
      marsh:   meanSd(marsh.map((r) => num(r[key])).filter((n) => !Number.isNaN(n))),
      drained: meanSd(drained.map((r) => num(r[key])).filter((n) => !Number.isNaN(n)))
    };
  });
}

export function meadowDiversityStats(rows: ClassRow[]) {
  const meadow = meadowRowsOnly(rows);
  const marsh   = meadow.filter((r) => String(r.meadow_site) === "marsh");
  const drained = meadow.filter((r) => String(r.meadow_site) === "drained");
  return {
    marsh:   meanSd(marsh.map((r) => num(r.simpsons_meadow))),
    drained: meanSd(drained.map((r) => num(r.simpsons_meadow))),
    overall: meanSd(meadow.map((r) => num(r.simpsons_meadow)))
  };
}
