import { SPECIES } from "@/lib/constants";
import { fmt } from "@/lib/calculations";
import type { SurveyState } from "@/lib/types";

type Props = { bio: SurveyState["bio"] };

export default function BioticCalcDetails({ bio }: Props) {
  const rows = SPECIES.map((sp) => ({
    name: sp.name,
    tol:  sp.tol,
    n:    bio[sp.id] || 0,
    nt:   (bio[sp.id] || 0) * sp.tol
  })).filter((r) => r.n > 0);

  const sumNT = rows.reduce((a, r) => a + r.nt, 0);
  const N     = rows.reduce((a, r) => a + r.n, 0);
  const bi    = N ? sumNT / N : null;

  if (!rows.length) {
    return (
      <p className="font-mono text-[11px] text-ink3 leading-relaxed">
        Count some species first and the working will appear here.
      </p>
    );
  }

  return (
    <div className="border border-rule">
      <table className="w-full font-mono text-[11px] border-collapse">
        <thead>
          <tr className="bg-paper2/40">
            <th className="text-left text-ink2 font-medium px-2 py-1.5 border-b border-rule">
              Species
            </th>
            <th className="text-right text-ink2 font-medium px-2 py-1.5 border-b border-rule">
              n
            </th>
            <th className="text-right text-ink2 font-medium px-2 py-1.5 border-b border-rule">
              tol
            </th>
            <th className="text-right text-ink2 font-medium px-2 py-1.5 border-b border-rule">
              n &times; tol
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-rule/50 last:border-b-0">
              <td className="px-2 py-1.5 font-sans text-ink">{r.name}</td>
              <td className="px-2 py-1.5 text-right text-ink">{r.n}</td>
              <td className="px-2 py-1.5 text-right text-ink2">{r.tol}</td>
              <td className="px-2 py-1.5 text-right text-teal">{r.nt}</td>
            </tr>
          ))}
          <tr className="bg-paper2/40 border-t border-ink2">
            <td className="px-2 py-2 text-ink2 uppercase tracking-spec text-[10px]">
              Total
            </td>
            <td className="px-2 py-2 text-right text-ink font-medium">{N}</td>
            <td className="px-2 py-2"></td>
            <td className="px-2 py-2 text-right text-ink font-medium">{sumNT}</td>
          </tr>
        </tbody>
      </table>
      <div className="px-2 py-2 font-mono text-[12px] text-ink2 bg-paper border-t border-rule leading-relaxed">
        BI = &Sigma;(n &times; tol) &divide; N = {sumNT} &divide; {N} =
        <span className="text-ink font-serif text-[16px] ml-1">
          {fmt(bi)}
        </span>
      </div>
    </div>
  );
}
