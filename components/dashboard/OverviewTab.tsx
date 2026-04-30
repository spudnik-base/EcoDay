"use client";

import StatCard from "./overview/StatCard";
import BIChart from "./overview/BIChart";
import SpecLabel from "@/components/ui/SpecLabel";
import { CONFIG } from "@/lib/config";
import { fmt, qualityOf } from "@/lib/calculations";
import type { ParsedRow } from "@/lib/parseRow";

type Props = { rows: ParsedRow[] };

export default function OverviewTab({ rows }: Props) {
  const validBI = rows.filter((r) => !Number.isNaN(r.bi));
  const avgBI = validBI.length
    ? validBI.reduce((a, r) => a + r.bi, 0) / validBI.length
    : null;
  const validD = rows.filter((r) => !Number.isNaN(r.dStream));
  const avgD = validD.length
    ? validD.reduce((a, r) => a + r.dStream, 0) / validD.length
    : null;
  const sites = new Set(rows.map((r) => r.site).filter((s) => !Number.isNaN(s)));
  const q = qualityOf(avgBI);

  const biSub = avgBI === null
    ? ""
    : avgBI > 10
    ? "clean stream"
    : avgBI >= 3
    ? "some pollution"
    : "gross pollution";

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <StatCard
          label="Groups submitted"
          value={String(rows.length)}
          sub={`of ${CONFIG.GROUP_COUNT} groups`}
        />
        <StatCard
          label="Class avg biotic index"
          value={avgBI !== null ? fmt(avgBI, 1) : "·"}
          sub={biSub}
          valueColor={q?.fg}
        />
        <StatCard
          label="Avg Simpson's D"
          value={avgD !== null ? fmt(avgD, 3) : "·"}
          sub="stream diversity"
        />
        <StatCard
          label="Sites covered"
          value={String(sites.size)}
          sub={`of ${CONFIG.SITE_COUNT} sites`}
        />
      </div>
      <section className="bg-paper border border-rule p-4">
        <SpecLabel>Biotic index by site</SpecLabel>
        <BIChart rows={rows} />
      </section>
    </div>
  );
}
