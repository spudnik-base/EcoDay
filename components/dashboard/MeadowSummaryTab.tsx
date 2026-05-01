"use client";

import SpecLabel from "@/components/ui/SpecLabel";
import ErrorBarHint from "@/components/ui/ErrorBarHint";
import StatPair from "./summary/StatPair";
import PairedBars from "./summary/PairedBars";
import CoverByLetterChart from "./meadow/CoverByLetterChart";
import {
  coverByLetterByHabitat,
  meadowDiversityStats,
  meadowRowsOnly
} from "@/lib/meadowAggregations";
import type { ClassRow } from "@/lib/useClassData";

const MOSS = "#4B6A2C";
const DRAINED = "#A47A1B";

type Props = { rows: ClassRow[] };

export default function MeadowSummaryTab({ rows }: Props) {
  const meadow = meadowRowsOnly(rows);
  if (!meadow.length) {
    return (
      <section className="bg-paper border border-rule p-6">
        <div className="text-center text-ink4 font-mono text-[11px]">
          No meadow submissions yet. Charts will appear once data starts arriving.
        </div>
      </section>
    );
  }

  const div = meadowDiversityStats(rows);
  const cover = coverByLetterByHabitat(rows);

  return (
    <div className="space-y-3">
      <section className="bg-paper border border-rule p-4">
        <SpecLabel>Headline diversity</SpecLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <StatPair label="Meadow Simpson's D, all" stat={div.overall} decimals={3} />
          <StatPair label="Marsh (ungrazed)" stat={div.marsh} decimals={3} />
          <StatPair label="Drained (grazed)" stat={div.drained} decimals={3} />
        </div>
      </section>

      <section className="bg-paper border border-rule p-4">
        <SpecLabel>Marsh vs drained, Simpson&apos;s D</SpecLabel>
        <PairedBars
          bars={[
            { label: "Marsh (ungrazed)", stat: div.marsh,   color: MOSS },
            { label: "Drained (grazed)", stat: div.drained, color: DRAINED }
          ]}
          yMax={1}
          yLabel="Simpson's D"
          decimals={2}
        />
        <ErrorBarHint />
      </section>

      <section className="bg-paper border border-rule p-4">
        <SpecLabel>Per-species cover, marsh vs drained</SpecLabel>
        <CoverByLetterChart rows={cover} />
        <p className="font-mono text-[10px] text-ink3 mt-2 leading-relaxed">
          Each letter is a quadrat species (A through P). Marsh in moss green,
          drained in amber.
        </p>
        <ErrorBarHint />
      </section>
    </div>
  );
}
