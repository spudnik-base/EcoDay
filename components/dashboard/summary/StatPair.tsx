import type { MeanSd } from "@/lib/aggregations";

type Props = {
  label: string;
  stat: MeanSd;
  decimals?: number;
  unit?: string;
};

function fmt(n: number | null, d: number): string {
  return n === null ? "" : n.toFixed(d);
}

export default function StatPair({ label, stat, decimals = 2, unit }: Props) {
  return (
    <div className="bg-paper border border-rule px-4 py-3.5">
      <div className="text-[10px] font-mono uppercase tracking-spec text-ink2 font-medium mb-1">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <div className="font-serif text-[28px] leading-none tracking-tight text-ink">
          {stat.mean !== null ? fmt(stat.mean, decimals) : "·"}
        </div>
        {unit && (
          <span className="font-mono text-[11px] text-ink3">{unit}</span>
        )}
      </div>
      <div className="font-mono text-[10px] text-ink3 mt-1.5">
        {stat.sd !== null ? `± ${fmt(stat.sd, decimals)} SD` : "single sample"}
        <span className="text-ink4 ml-2">n = {stat.n}</span>
      </div>
    </div>
  );
}
