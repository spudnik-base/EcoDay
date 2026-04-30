"use client";

import SpecLabel from "@/components/ui/SpecLabel";
import FlowCompare from "./compare/FlowCompare";
import SimpsonChart from "./compare/SimpsonChart";
import AltScatter from "./compare/AltScatter";
import type { ParsedRow } from "@/lib/parseRow";

type Props = { rows: ParsedRow[] };

export default function CompareTab({ rows }: Props) {
  return (
    <div className="space-y-3">
      <section className="bg-paper border border-rule p-4">
        <SpecLabel>Pool vs riffle, biotic index</SpecLabel>
        <FlowCompare rows={rows} />
      </section>
      <section className="bg-paper border border-rule p-4">
        <SpecLabel>Stream Simpson's D by site</SpecLabel>
        <SimpsonChart rows={rows} />
      </section>
      <section className="bg-paper border border-rule p-4">
        <SpecLabel>Altitude vs biotic index</SpecLabel>
        <AltScatter rows={rows} />
      </section>
    </div>
  );
}
