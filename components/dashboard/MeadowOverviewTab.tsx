"use client";

import StatCard from "./overview/StatCard";
import SpecLabel from "@/components/ui/SpecLabel";
import {
  meadowDiversityStats,
  meadowRowsOnly
} from "@/lib/meadowAggregations";
import { fmt } from "@/lib/calculations";
import { CONFIG } from "@/lib/config";
import type { ClassRow } from "@/lib/useClassData";

type Props = { rows: ClassRow[] };

export default function MeadowOverviewTab({ rows }: Props) {
  const meadow = meadowRowsOnly(rows);
  const div = meadowDiversityStats(rows);
  const groups = new Set(meadow.map((r) => String(r.group)).filter(Boolean));

  const marshN   = meadow.filter((r) => String(r.meadow_site) === "marsh").length;
  const drainedN = meadow.filter((r) => String(r.meadow_site) === "drained").length;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <StatCard
          label="Submissions"
          value={String(meadow.length)}
          sub={`from ${groups.size} group${groups.size === 1 ? "" : "s"}`}
        />
        <StatCard
          label="Marsh quadrats"
          value={String(marshN)}
          sub="ungrazed"
        />
        <StatCard
          label="Drained quadrats"
          value={String(drainedN)}
          sub="grazed"
        />
        <StatCard
          label="Class avg Simpson's D"
          value={div.overall.mean !== null ? fmt(div.overall.mean, 3) : "·"}
          sub={
            div.overall.sd !== null
              ? `± ${fmt(div.overall.sd, 3)} SD`
              : "single sample"
          }
        />
      </div>
      {meadow.length === 0 && (
        <section className="bg-paper border border-rule p-6">
          <SpecLabel>Waiting for data</SpecLabel>
          <p className="text-center text-ink4 font-mono text-[11px] py-6">
            No meadow submissions yet. Stat cards above and charts in the
            Summary tab will populate as groups submit.
          </p>
          <p className="font-mono text-[10px] text-ink4 leading-relaxed text-center">
            (Meadow webhook: {CONFIG.WEBHOOK_URL_MEADOW.slice(-12)})
          </p>
        </section>
      )}
    </div>
  );
}
