import { fmt } from "@/lib/calculations";
import { CONFIG } from "@/lib/config";
import type { ParsedRow } from "@/lib/parseRow";

type Props = { rows: ParsedRow[] };

const CHART_H = 120;

function colorFor(d: number) {
  if (d > 0.7) return { bg: "#DEEAE3", fg: "#21503F", border: "#7FB29A" };
  if (d > 0.4) return { bg: "#F0E3CB", fg: "#6C4A0E", border: "#C49B4A" };
  return         { bg: "#F1DCD2", fg: "#7A2A12", border: "#C57A5C" };
}

export default function SimpsonChart({ rows }: Props) {
  const valid = rows.filter((r) => !Number.isNaN(r.site) && !Number.isNaN(r.dStream));
  if (valid.length < 2) {
    return (
      <div className="text-center py-6 font-mono text-[11px] text-ink4">
        Need at least 2 sites
      </div>
    );
  }
  const bySite: Record<number, ParsedRow> = {};
  for (const r of valid) bySite[r.site] = r;
  return (
    <div className="relative" style={{ height: CHART_H + 22 }}>
      <div
        className="flex items-end gap-1.5 absolute inset-x-0 top-2"
        style={{ height: CHART_H }}
      >
        {Array.from({ length: CONFIG.SITE_COUNT }, (_, i) => i + 1).map((s) => {
          const r = bySite[s];
          if (!r) {
            return (
              <div key={s} className="flex-1 flex items-end justify-center">
                <div className="w-full h-[3px] bg-rule/60" />
              </div>
            );
          }
          const c = colorFor(r.dStream);
          const h = r.dStream * 100;
          return (
            <div key={s} className="flex-1 flex items-end justify-center relative h-full">
              <div
                className="w-full"
                style={{ height: `${h}%`, background: c.bg, border: `0.5px solid ${c.border}` }}
              >
                <span
                  className="absolute left-1/2 -translate-x-1/2 -top-4 font-mono text-[10px]"
                  style={{ color: c.fg }}
                >
                  {fmt(r.dStream, 2)}
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
