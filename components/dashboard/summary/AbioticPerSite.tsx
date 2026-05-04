"use client";

import { useState } from "react";
import SpecLabel from "@/components/ui/SpecLabel";
import ErrorBarHint from "@/components/ui/ErrorBarHint";
import FactorPicker from "./FactorPicker";
import AbioticPerSiteChart from "./AbioticPerSiteChart";
import { CONFIG } from "@/lib/config";
import {
  abioticPerSite,
  FACTORS,
  type FactorKey
} from "@/lib/abioticAggregations";
import type { ParsedRow } from "@/lib/parseRow";

const COLOR = "#3F8A72";  // teal, matches stream theme

type Props = { rows: ParsedRow[] };

function decimalsFor(key: FactorKey): number {
  if (key === "ph") return 2;
  if (key === "velocity" || key === "nitrate") return 2;
  return 1;
}

function suggestedYMax(stats: { mean: number | null; sd: number | null }[], floor: number): number {
  let max = floor;
  for (const s of stats) {
    if (s.mean === null) continue;
    const top = s.mean + (s.sd ?? 0);
    if (top > max) max = top;
  }
  return Math.ceil(max * 1.1);
}

export default function AbioticPerSite({ rows }: Props) {
  const [factor, setFactor] = useState<FactorKey>("velocity");
  const stats = abioticPerSite(rows, factor, CONFIG.SITE_COUNT);
  const meta = FACTORS.find((f) => f.key === factor)!;
  const ySensible = factor === "ph" ? 14 : 1;
  const yMax = suggestedYMax(stats, ySensible);

  return (
    <section className="bg-paper border border-rule p-4">
      <SpecLabel>Per-site abiotic</SpecLabel>
      <FactorPicker value={factor} onChange={setFactor} />
      <AbioticPerSiteChart
        perSite={stats}
        yMax={yMax}
        yLabel={`${meta.label}${meta.unit ? ` (${meta.unit})` : ""}`}
        color={COLOR}
        decimals={decimalsFor(factor)}
      />
      <p className="font-mono text-[10px] text-ink3 leading-relaxed mt-2">
        Bars: mean of all per-group means at each site, with 1 SD whisker
        when two or more groups have visited a site. Empty sites have no
        submissions yet.
      </p>
      <ErrorBarHint />
    </section>
  );
}
