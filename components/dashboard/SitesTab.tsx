"use client";

import SpecLabel from "@/components/ui/SpecLabel";
import SiteTile from "./sites/SiteTile";
import { CONFIG } from "@/lib/config";
import type { ParsedRow } from "@/lib/parseRow";

type Props = { rows: ParsedRow[] };

export default function SitesTab({ rows }: Props) {
  const bySite: Record<number, ParsedRow> = {};
  for (const r of rows) if (!Number.isNaN(r.site)) bySite[r.site] = r;
  return (
    <section className="bg-paper border border-rule p-4">
      <SpecLabel>Site-by-site summary</SpecLabel>
      <div className="grid grid-cols-5 gap-1.5">
        {Array.from({ length: CONFIG.SITE_COUNT }, (_, i) => i + 1).map((s) => (
          <SiteTile key={s} siteNumber={s} row={bySite[s]} />
        ))}
      </div>
    </section>
  );
}
