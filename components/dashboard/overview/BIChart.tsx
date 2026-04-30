import { qualityOf, fmt } from "@/lib/calculations";
import { CONFIG } from "@/lib/config";
import type { ParsedRow } from "@/lib/parseRow";

type Props = { rows: ParsedRow[] };

const MAX_BI = 20;
const CHART_H = 120;

export default function BIChart({ rows }: Props) {
  if (!rows.length) {
    return (
      <div className="text-center py-10 text-ink4 font-mono text-[11px]">
        No data yet. Waiting for first submission.
      </div>
    );
  }
  const bySite: Record<number, ParsedRow> = {};
  for (const r of rows) {
    if (!Number.isNaN(r.site) && !Number.isNaN(r.bi)) bySite[r.site] = r;
  }
  const refY = (val: number) => CHART_H - (val / MAX_BI) * CHART_H + 8;

  return (
    <div className="relative" style={{ height: CHART_H + 28 }}>
      <div
        className="absolute left-0 right-0 border-t border-dashed border-rule"
        style={{ top: refY(10) }}
      >
        <span className="absolute right-0 -top-3 font-mono text-[9px] text-ink4">
          BI 10
        </span>
      </div>
      <div
        className="absolute left-0 right-0 border-t border-dashed border-rule"
        style={{ top: refY(3) }}
      >
        <span className="absolute right-0 -top-3 font-mono text-[9px] text-amber1">
          BI 3
        </span>
      </div>
      <div
        className="flex items-end gap-1.5 absolute inset-x-0 top-2"
        style={{ height: CHART_H }}
      >
        {Array.from({ length: CONFIG.SITE_COUNT }, (_, i) => i + 1).map((s) => {
          const r = bySite[s];
          if (!r) {
            return (
              <div key={s} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="w-full h-[3px] bg-rule/60" />
              </div>
            );
          }
          const q = qualityOf(r.bi);
          const h = Math.min((r.bi / MAX_BI) * 100, 100);
          return (
            <div key={s} className="flex-1 flex flex-col items-center justify-end h-full relative">
              <div
                className="w-full"
                style={{
                  height: `${h}%`,
                  background: q?.bg,
                  border: `0.5px solid ${q?.border}`
                }}
              >
                <span
                  className="absolute left-1/2 -translate-x-1/2 -top-4 font-mono text-[10px]"
                  style={{ color: q?.fg }}
                >
                  {fmt(r.bi, 1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-1.5 absolute inset-x-0 bottom-0">
        {Array.from({ length: CONFIG.SITE_COUNT }, (_, i) => i + 1).map((s) => (
          <div
            key={s}
            className={[
              "flex-1 text-center font-mono text-[9px]",
              bySite[s] ? "text-ink3" : "text-ink4"
            ].join(" ")}
          >
            S{s}
          </div>
        ))}
      </div>
    </div>
  );
}
