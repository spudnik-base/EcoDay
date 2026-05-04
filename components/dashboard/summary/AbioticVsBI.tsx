"use client";

import { useState } from "react";
import SpecLabel from "@/components/ui/SpecLabel";
import FactorPicker from "./FactorPicker";
import AbioticVsBIChart from "./AbioticVsBIChart";
import { CONFIG } from "@/lib/config";
import {
  FACTORS,
  siteAbioticVsBi,
  type FactorKey
} from "@/lib/abioticAggregations";
import type { ParsedRow } from "@/lib/parseRow";

type Props = { rows: ParsedRow[] };

export default function AbioticVsBI({ rows }: Props) {
  const [factor, setFactor] = useState<FactorKey>("nitrate");
  const points = siteAbioticVsBi(rows, factor, CONFIG.SITE_COUNT);
  const meta = FACTORS.find((f) => f.key === factor)!;
  const xLabel = `${meta.label}${meta.unit ? ` (${meta.unit})` : ""}`;

  return (
    <section className="bg-paper border border-rule p-4">
      <SpecLabel>Abiotic vs biotic index</SpecLabel>
      <FactorPicker value={factor} onChange={setFactor} />
      <AbioticVsBIChart points={points} xLabel={xLabel} />
      <p className="font-mono text-[10px] text-ink3 leading-relaxed mt-2">
        Each point is one stream site (mean abiotic vs mean BI). Dashed lines:
        BI 10 (good) and BI 3 (poor). A clear up-or-down trend across sites
        suggests a real abiotic-biotic relationship; scatter suggests no
        relationship at this scale.
      </p>
    </section>
  );
}
