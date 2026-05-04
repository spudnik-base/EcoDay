"use client";

import { useState } from "react";
import SpecLabel from "@/components/ui/SpecLabel";
import ErrorBarHint from "@/components/ui/ErrorBarHint";
import FactorPicker from "./FactorPicker";
import PairedBars from "./PairedBars";
import {
  abioticByFlow,
  FACTORS,
  type FactorKey
} from "@/lib/abioticAggregations";
import type { ParsedRow } from "@/lib/parseRow";

const TEAL = "#3F8A72";
const POOL = "#3A6BB7";

type Props = { rows: ParsedRow[] };

function decimalsFor(key: FactorKey): number {
  if (key === "ph") return 2;
  if (key === "velocity" || key === "nitrate") return 2;
  return 1;
}

function yMaxFor(
  flow: ReturnType<typeof abioticByFlow>,
  factor: FactorKey
): number {
  const candidates = [flow.riffle, flow.pool];
  let max = 0;
  for (const s of candidates) {
    if (s.mean === null) continue;
    const top = s.mean + (s.sd ?? 0);
    if (top > max) max = top;
  }
  if (factor === "ph") return Math.max(14, Math.ceil(max * 1.1));
  return Math.max(1, Math.ceil(max * 1.1));
}

export default function AbioticPoolRiffle({ rows }: Props) {
  const [factor, setFactor] = useState<FactorKey>("ph");
  const flow = abioticByFlow(rows, factor);
  const meta = FACTORS.find((f) => f.key === factor)!;
  const yMax = yMaxFor(flow, factor);

  return (
    <section className="bg-paper border border-rule p-4">
      <SpecLabel>Pool vs riffle, abiotic</SpecLabel>
      <FactorPicker value={factor} onChange={setFactor} />
      <PairedBars
        bars={[
          { label: "Riffle", stat: flow.riffle, color: TEAL },
          { label: "Pool",   stat: flow.pool,   color: POOL }
        ]}
        yMax={yMax}
        yLabel={`${meta.label}${meta.unit ? ` (${meta.unit})` : ""}`}
        decimals={decimalsFor(factor)}
      />
      <p className="font-mono text-[10px] text-ink3 leading-relaxed mt-2">
        Mean of all submissions in each flow type, error whisker = 1 SD.
        Tests predictions like &quot;riffles are colder and higher pH&quot;
        against your class data.
      </p>
      <ErrorBarHint />
    </section>
  );
}
