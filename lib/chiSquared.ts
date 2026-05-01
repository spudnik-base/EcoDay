// Chi-squared test of association (2x2, df = 1).
// Asks: does finding species 1 predict finding species 2 in the same sample?
// Each class submission contributes one observation. Per submission we record
// whether each species was present (stream count > 0, or meadow % cover > 0).
// H0: the two species are independent. Critical value at p = 0.05, df = 1
// is 3.84. If reject H0 and observed-together (cell a) > expected, the
// association is positive (species co-occur). If a < expected, negative
// (species avoid each other / segregate).

import type { ClassRow } from "./useClassData";
import { MEADOW_LABELS, SPECIES, type SpeciesId } from "./constants";

export const CRITICAL_CHI = 3.84;

export type Habitat = "stream" | "meadow";

export type ChiInput = {
  habitat: Habitat;
  speciesId1: string;
  speciesId2: string;
};

export type ChiLabels = {
  sp1: string;
  sp2: string;
  universe: string;     // "stream kick samples" / "meadow quadrats"
};

export type ChiOk = {
  kind: "ok";
  labels: ChiLabels;
  // observed counts of submissions in each cell
  a: number;            // sp1 present, sp2 present
  b: number;            // sp1 present, sp2 absent
  c: number;            // sp1 absent,  sp2 present
  d: number;            // sp1 absent,  sp2 absent
  N: number;            // total submissions in this universe
  // marginal totals
  row1: number; row2: number;
  colA: number; colB: number;
  // expected counts
  ea: number; eb: number; ec: number; ed: number;
  // per-cell chi components
  ca: number; cb: number; cc: number; cd: number;
  chi: number;
  reject: boolean;
  positive: boolean;    // true = positive association (found together more than expected)
  warnLowExpected: boolean;
};

export type ChiNeedData = {
  kind: "needData";
  reason: string;
  labels: ChiLabels;
  N: number;
};

export type ChiResult = ChiOk | ChiNeedData;

function num(v: unknown): number {
  const n = parseFloat(String(v));
  return Number.isNaN(n) ? 0 : n;
}

export function speciesOptions(habitat: Habitat): { id: string; label: string }[] {
  if (habitat === "stream") {
    return SPECIES.map((s) => ({ id: s.id as SpeciesId, label: s.name }));
  }
  return MEADOW_LABELS.map((l) => ({ id: l, label: `Species ${l}` }));
}

function speciesLabel(habitat: Habitat, id: string): string {
  return speciesOptions(habitat).find((o) => o.id === id)?.label ?? id;
}

function isPresent(row: ClassRow, habitat: Habitat, speciesId: string): boolean {
  const key = habitat === "stream" ? speciesId : `sp_${speciesId}`;
  return num(row[key]) > 0;
}

function universeRows(rows: ClassRow[], habitat: Habitat): ClassRow[] {
  if (habitat === "stream") {
    // any submission with a flow type recorded
    return rows.filter((r) => {
      const flow = String(r.flow);
      return flow === "riffle" || flow === "pool";
    });
  }
  return rows.filter((r) => {
    const m = String(r.meadow_site);
    return m === "marsh" || m === "drained";
  });
}

export function chiSquared(rows: ClassRow[], input: ChiInput): ChiResult {
  const labels: ChiLabels = {
    sp1:      speciesLabel(input.habitat, input.speciesId1),
    sp2:      speciesLabel(input.habitat, input.speciesId2),
    universe: input.habitat === "stream" ? "stream kick samples" : "meadow quadrats"
  };

  const universe = universeRows(rows, input.habitat);
  let a = 0, b = 0, c = 0, d = 0;
  for (const r of universe) {
    const p1 = isPresent(r, input.habitat, input.speciesId1);
    const p2 = isPresent(r, input.habitat, input.speciesId2);
    if (p1 && p2) a++;
    else if (p1 && !p2) b++;
    else if (!p1 && p2) c++;
    else d++;
  }
  const N = a + b + c + d;

  if (N < 4) {
    return {
      kind: "needData",
      reason: `need at least 4 ${labels.universe} (have ${N})`,
      labels, N
    };
  }

  const row1 = a + b;
  const row2 = c + d;
  const colA = a + c;
  const colB = b + d;

  if (row1 === 0 || row2 === 0 || colA === 0 || colB === 0) {
    return {
      kind: "needData",
      reason: "one species was always present or always absent. Pick a different pair.",
      labels, N
    };
  }

  const ea = (row1 * colA) / N;
  const eb = (row1 * colB) / N;
  const ec = (row2 * colA) / N;
  const ed = (row2 * colB) / N;

  const ca = ((a - ea) ** 2) / ea;
  const cb = ((b - eb) ** 2) / eb;
  const cc = ((c - ec) ** 2) / ec;
  const cd = ((d - ed) ** 2) / ed;
  const chi = ca + cb + cc + cd;

  return {
    kind: "ok",
    labels,
    a, b, c, d, N,
    row1, row2, colA, colB,
    ea, eb, ec, ed,
    ca, cb, cc, cd,
    chi,
    reject: chi > CRITICAL_CHI,
    positive: a > ea,
    warnLowExpected: [ea, eb, ec, ed].some((e) => e < 5)
  };
}
