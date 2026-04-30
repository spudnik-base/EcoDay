import { fmt } from "@/lib/calculations";
import type { ParsedRow } from "@/lib/parseRow";

type Props = { rows: ParsedRow[] };

function avg(xs: number[]): number | null {
  if (!xs.length) return null;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

export default function FlowCompare({ rows }: Props) {
  const riffles = rows.filter((r) => r.flow === "riffle" && !Number.isNaN(r.bi));
  const pools   = rows.filter((r) => r.flow === "pool"   && !Number.isNaN(r.bi));
  if (!riffles.length && !pools.length) {
    return (
      <div className="text-center py-6 font-mono text-[11px] text-ink4">
        Not enough data yet
      </div>
    );
  }
  const aR = avg(riffles.map((r) => r.bi));
  const aP = avg(pools.map((r) => r.bi));
  const max = Math.max(aR ?? 0, aP ?? 0, 20);
  const items = [
    { label: `Riffles (n=${riffles.length})`, val: aR, color: "#3F8A72" },
    { label: `Pools (n=${pools.length})`,     val: aP, color: "#3A6BB7" }
  ];
  return (
    <div>
      {items.map(({ label, val, color }) => {
        const pct = val ? Math.min((val / max) * 100, 100) : 0;
        return (
          <div key={label} className="flex items-center gap-2 py-1.5 border-b border-rule/50 last:border-b-0">
            <div className="w-28 font-mono text-[11px] text-ink3">{label}</div>
            <div className="flex-1 h-2 bg-paper2/60 overflow-hidden">
              <div className="h-full" style={{ width: `${pct}%`, background: color }} />
            </div>
            <div className="w-12 text-right font-mono text-[12px]" style={{ color }}>
              {val !== null ? fmt(val, 1) : "·"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
