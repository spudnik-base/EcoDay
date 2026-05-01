import Link from "next/link";
import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import { fmt } from "@/lib/calculations";
import { parseRow } from "@/lib/parseRow";
import { streamDiversityStats } from "@/lib/aggregations";
import { meadowDiversityStats } from "@/lib/meadowAggregations";
import type { ClassRow } from "@/lib/useClassData";

type Props = {
  streamRows: ClassRow[];
  meadowRows: ClassRow[];
};

export default function ClassGlance({ streamRows, meadowRows }: Props) {
  const parsedStream = streamRows.map(parseRow);
  const validBI = parsedStream.filter((r) => !Number.isNaN(r.bi));
  const avgBI = validBI.length
    ? validBI.reduce((a, r) => a + r.bi, 0) / validBI.length
    : null;
  const sStats = streamDiversityStats(parsedStream);
  const mStats = meadowDiversityStats(meadowRows);

  return (
    <Card>
      <SpecLabel>Class data at a glance</SpecLabel>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <Stat label="Stream submissions" value={String(streamRows.length)} />
        <Stat label="Meadow submissions" value={String(meadowRows.length)} />
        <Stat
          label="Class avg biotic index"
          value={avgBI !== null ? fmt(avgBI, 1) : "·"}
        />
        <Stat
          label="Avg meadow Simpson's D"
          value={
            mStats.overall.mean !== null
              ? fmt(mStats.overall.mean, 3)
              : "·"
          }
          sub={
            sStats.mean !== null
              ? `stream D ${fmt(sStats.mean, 3)}`
              : undefined
          }
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Link
          href="/dashboard/stream"
          className="block bg-paper border border-ink2 hover:border-ink px-3 py-2 text-center font-mono uppercase tracking-spec text-[11px] font-medium text-ink"
        >
          Open stream dashboard &rarr;
        </Link>
        <Link
          href="/dashboard/meadow"
          className="block bg-paper border border-ink2 hover:border-ink px-3 py-2 text-center font-mono uppercase tracking-spec text-[11px] font-medium text-ink"
        >
          Open meadow dashboard &rarr;
        </Link>
      </div>
    </Card>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-paper2/40 border border-rule px-3 py-2.5">
      <div className="text-[10px] font-mono uppercase tracking-spec text-ink2 font-medium mb-1">
        {label}
      </div>
      <div className="font-serif text-[24px] leading-none text-ink">{value}</div>
      {sub && (
        <div className="font-mono text-[10px] text-ink3 mt-1">{sub}</div>
      )}
    </div>
  );
}
