"use client";

import SpecLabel from "@/components/ui/SpecLabel";
import BiPill from "./data/BiPill";
import { fmt } from "@/lib/calculations";
import type { ParsedRow } from "@/lib/parseRow";

type Props = { rows: ParsedRow[] };

const HEAD = [
  "Group", "Site", "Flow", "Biotic", "Simpson", "Alt m", "Lux", "pH", "Temp", "Nitrate", "Time"
];

function timeOf(iso: string): string {
  if (!iso) return "·";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "·";
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function num(v: number, d = 1): string {
  return Number.isNaN(v) ? "·" : fmt(v, d);
}

export default function DataTable({ rows }: Props) {
  const sorted = [...rows].sort(
    (a, b) => (Number.isNaN(a.site) ? 99 : a.site) - (Number.isNaN(b.site) ? 99 : b.site)
  );
  return (
    <section className="bg-paper border border-rule p-4">
      <SpecLabel>All submissions</SpecLabel>
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-[12px] border-collapse">
          <thead>
            <tr>
              {HEAD.map((h) => (
                <th
                  key={h}
                  className="text-left text-[10px] uppercase tracking-spec text-ink3 font-medium px-2 py-1.5 border-b border-rule"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr>
                <td
                  colSpan={HEAD.length}
                  className="text-center text-ink4 py-10 font-sans"
                >
                  No data yet
                </td>
              </tr>
            )}
            {sorted.map((r, i) => (
              <tr key={i} className="border-b border-rule/40 last:border-b-0">
                <td className="px-2 py-1.5 text-ink">{r.group || "·"}</td>
                <td className="px-2 py-1.5 text-ink">{r.site || "·"}</td>
                <td className="px-2 py-1.5">
                  <span className="bg-paper2 text-ink3 px-1.5 py-0.5 text-[10px]">
                    {r.flow || "·"}
                  </span>
                </td>
                <td className="px-2 py-1.5"><BiPill bi={r.bi} /></td>
                <td className="px-2 py-1.5 text-ink2">{num(r.dStream, 3)}</td>
                <td className="px-2 py-1.5 text-ink2">
                  {Number.isNaN(r.alt) ? "·" : Math.round(r.alt)}
                </td>
                <td className="px-2 py-1.5 text-ink2">
                  {Number.isNaN(r.lux) ? "·" : Math.round(r.lux)}
                </td>
                <td className="px-2 py-1.5 text-ink2">{num(r.ph, 1)}</td>
                <td className="px-2 py-1.5 text-ink2">{num(r.temp, 1)}</td>
                <td className="px-2 py-1.5 text-ink2">{num(r.nitrate, 1)}</td>
                <td className="px-2 py-1.5 text-ink4">{timeOf(r.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
