"use client";

import SpecLabel from "@/components/ui/SpecLabel";
import { MEADOW_LABELS } from "@/lib/constants";
import type { ClassRow } from "@/lib/useClassData";
import { meadowRowsOnly } from "@/lib/meadowAggregations";

type Props = { rows: ClassRow[] };

function timeOf(iso: unknown): string {
  if (!iso) return "·";
  const d = new Date(String(iso));
  if (Number.isNaN(d.getTime())) return "·";
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function fmtCover(v: unknown): string {
  const n = parseFloat(String(v));
  if (Number.isNaN(n) || n === 0) return "·";
  return String(Math.round(n));
}

export default function MeadowDataTable({ rows }: Props) {
  const data = meadowRowsOnly(rows);
  return (
    <section className="bg-paper border border-rule p-4">
      <SpecLabel>All meadow submissions</SpecLabel>
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-[12px] border-collapse">
          <thead>
            <tr>
              <th className="text-left text-[10px] uppercase tracking-spec text-ink3 font-medium px-2 py-1.5 border-b border-rule">Group</th>
              <th className="text-left text-[10px] uppercase tracking-spec text-ink3 font-medium px-2 py-1.5 border-b border-rule">Site</th>
              <th className="text-right text-[10px] uppercase tracking-spec text-ink3 font-medium px-2 py-1.5 border-b border-rule">D</th>
              {MEADOW_LABELS.map((l) => (
                <th
                  key={l}
                  className="text-right text-[10px] uppercase tracking-spec text-ink3 font-medium px-2 py-1.5 border-b border-rule"
                >
                  {l}
                </th>
              ))}
              <th className="text-left text-[10px] uppercase tracking-spec text-ink3 font-medium px-2 py-1.5 border-b border-rule">Time</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={MEADOW_LABELS.length + 4} className="text-center text-ink4 py-10 font-sans">
                  No meadow submissions yet
                </td>
              </tr>
            )}
            {data.map((r, i) => (
              <tr key={i} className="border-b border-rule/40 last:border-b-0">
                <td className="px-2 py-1.5 text-ink">{String(r.group ?? "·")}</td>
                <td className="px-2 py-1.5">
                  <span className="bg-paper2 text-ink3 px-1.5 py-0.5 text-[10px]">
                    {String(r.meadow_site ?? "·")}
                  </span>
                </td>
                <td className="px-2 py-1.5 text-right text-ink2">
                  {String(r.simpsons_meadow ?? "·")}
                </td>
                {MEADOW_LABELS.map((l) => (
                  <td key={l} className="px-2 py-1.5 text-right text-ink2">
                    {fmtCover(r[`sp_${l}`])}
                  </td>
                ))}
                <td className="px-2 py-1.5 text-ink4">{timeOf(r.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
