"use client";

import { useState } from "react";
import SpecLabel from "@/components/ui/SpecLabel";
import ErrorBarHint from "@/components/ui/ErrorBarHint";
import AbioticPerSiteChart from "../summary/AbioticPerSiteChart";
import DiversityMetricPicker from "./DiversityMetricPicker";
import { CONFIG } from "@/lib/config";
import {
  DIVERSITY_METRICS,
  diversityPerSite,
  type DiversityMetric
} from "@/lib/diversityMetrics";
import type { ParsedRow } from "@/lib/parseRow";

const COLOR = "#3F8A72";  // teal stream

type Props = { rows: ParsedRow[] };

export default function DiversityBySite({ rows }: Props) {
  const [metric, setMetric] = useState<DiversityMetric>("simpson");
  const meta = DIVERSITY_METRICS.find((m) => m.key === metric)!;
  const stats = diversityPerSite(rows, metric, CONFIG.SITE_COUNT);

  const explainer =
    metric === "simpson"
      ? "Simpson's D combines richness and evenness. D close to 1 = many species in even numbers. D close to 0 = one species dominates."
      : metric === "richness"
      ? "Species richness (S) is the count of species with at least one individual recorded. Sensitive to rare finds."
      : "Pielou's evenness (J = H'/ln(S)) is the ratio of observed Shannon diversity to its maximum given the richness. J = 1 means all species are equally abundant; J = 0 means one species dominates.";

  return (
    <section className="bg-paper border border-rule p-4">
      <SpecLabel>Stream diversity by site</SpecLabel>
      <DiversityMetricPicker value={metric} onChange={setMetric} />
      <AbioticPerSiteChart
        perSite={stats}
        yMax={meta.yMax}
        yLabel={meta.yLabel}
        color={COLOR}
        decimals={meta.decimals}
      />
      <p className="font-mono text-[10px] text-ink3 mt-2 leading-relaxed">
        {explainer}
      </p>
      <ErrorBarHint />
    </section>
  );
}
