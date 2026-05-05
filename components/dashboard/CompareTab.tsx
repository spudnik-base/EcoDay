import SpecLabel from "@/components/ui/SpecLabel";
import FlowCompare from "./compare/FlowCompare";
import DiversityBySite from "./compare/DiversityBySite";
import type { ParsedRow } from "@/lib/parseRow";

type Props = { rows: ParsedRow[] };

export default function CompareTab({ rows }: Props) {
  return (
    <div className="space-y-3">
      <section className="bg-paper border border-rule p-4">
        <SpecLabel>Pool vs riffle, biotic index</SpecLabel>
        <FlowCompare rows={rows} />
      </section>
      <DiversityBySite rows={rows} />
    </div>
  );
}
