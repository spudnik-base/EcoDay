"use client";

import SpecLabel from "@/components/ui/SpecLabel";
import StatPair from "./summary/StatPair";
import PairedBars from "./summary/PairedBars";
import SiteMeansChart from "./summary/SiteMeansChart";
import { CONFIG } from "@/lib/config";
import {
  abioticStats,
  biByFlow,
  biPerSite,
  streamDiversityStats
} from "@/lib/aggregations";
import type { ParsedRow } from "@/lib/parseRow";

const TEAL = "#3F8A72";
const POOL = "#3A6BB7";

type Props = { rows: ParsedRow[] };

export default function SummaryTab({ rows }: Props) {
  const stream = streamDiversityStats(rows);
  const flow = biByFlow(rows);
  const sitePerSite = biPerSite(rows, CONFIG.SITE_COUNT);
  const ab = abioticStats(rows);

  if (!rows.length) {
    return (
      <section className="bg-paper border border-rule p-6">
        <div className="text-center text-ink4 font-mono text-[11px]">
          No submissions yet. Auto-plots will appear once data starts arriving.
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-3">
      <section className="bg-paper border border-rule p-4">
        <SpecLabel>Headline diversity</SpecLabel>
        <StatPair label="Stream Simpson's D, class average" stat={stream} decimals={3} />
      </section>

      <section className="bg-paper border border-rule p-4">
        <SpecLabel>Class abiotic averages</SpecLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <StatPair label="Velocity" stat={ab.velocity} decimals={2} unit="m/s" />
          <StatPair label="Width" stat={ab.width} decimals={1} unit="cm" />
          <StatPair label="Depth" stat={ab.depth} decimals={1} unit="cm" />
          <StatPair label="pH" stat={ab.ph} decimals={2} />
          <StatPair label="Temperature" stat={ab.temp} decimals={1} unit="°C" />
          <StatPair label="Nitrate" stat={ab.nitrate} decimals={2} unit="ppm" />
        </div>
        <p className="font-mono text-[10px] text-ink3 mt-3 leading-relaxed">
          Each value: class mean of the per-group means, with 1 SD across submissions.
        </p>
      </section>

      <section className="bg-paper border border-rule p-4">
        <SpecLabel>Pool vs riffle, biotic index</SpecLabel>
        <PairedBars
          bars={[
            { label: "Riffle", stat: flow.riffle, color: TEAL },
            { label: "Pool",   stat: flow.pool,   color: POOL }
          ]}
          yMax={20}
          yLabel="Biotic index"
          decimals={1}
        />
        <p className="font-mono text-[10px] text-ink3 mt-2 leading-relaxed">
          Bars: mean biotic index across submissions of each flow type, error
          whisker = 1 SD.
        </p>
      </section>

      <section className="bg-paper border border-rule p-4">
        <SpecLabel>Mean biotic index per site</SpecLabel>
        <SiteMeansChart perSite={sitePerSite} yMax={20} yLabel="BI" />
        <p className="font-mono text-[10px] text-ink3 mt-2 leading-relaxed">
          Bars: mean BI per site (multiple groups same site = real SD).
          Empty sites: no submissions yet. Dashed lines: BI 10 and BI 3
          quality thresholds.
        </p>
      </section>
    </div>
  );
}
