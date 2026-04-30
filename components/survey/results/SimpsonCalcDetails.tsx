import { fmt } from "@/lib/calculations";

type Row = { name: string; n: number };

type Props = {
  rows: Row[];          // species name + count (or quadrat squares for meadow)
  unitLabel: string;    // "n" for stream count, "% cover" can map to n
  countNoun: string;    // "organisms" / "quadrat squares"
};

export default function SimpsonCalcDetails({ rows, unitLabel, countNoun }: Props) {
  const present = rows.filter((r) => r.n > 0);
  if (present.length < 2) {
    return (
      <p className="font-mono text-[11px] text-ink3 leading-relaxed">
        At least 2 species with non-zero counts are needed for Simpson&apos;s D.
      </p>
    );
  }
  const N      = present.reduce((a, r) => a + r.n, 0);
  const sumNN  = present.reduce((a, r) => a + r.n * (r.n - 1), 0);
  const denom  = N * (N - 1);
  const D      = denom > 0 ? 1 - sumNN / denom : null;

  return (
    <div className="border border-rule">
      <table className="w-full font-mono text-[11px] border-collapse">
        <thead>
          <tr className="bg-paper2/40">
            <th className="text-left text-ink2 font-medium px-2 py-1.5 border-b border-rule">
              Species
            </th>
            <th className="text-right text-ink2 font-medium px-2 py-1.5 border-b border-rule">
              {unitLabel}
            </th>
            <th className="text-right text-ink2 font-medium px-2 py-1.5 border-b border-rule">
              n(n &minus; 1)
            </th>
          </tr>
        </thead>
        <tbody>
          {present.map((r) => (
            <tr key={r.name} className="border-b border-rule/50 last:border-b-0">
              <td className="px-2 py-1.5 font-sans text-ink">{r.name}</td>
              <td className="px-2 py-1.5 text-right text-ink">{r.n}</td>
              <td className="px-2 py-1.5 text-right text-teal">
                {r.n * (r.n - 1)}
              </td>
            </tr>
          ))}
          <tr className="bg-paper2/40 border-t border-ink2">
            <td className="px-2 py-2 text-ink2 uppercase tracking-spec text-[10px]">
              Total ({countNoun})
            </td>
            <td className="px-2 py-2 text-right text-ink font-medium">{N}</td>
            <td className="px-2 py-2 text-right text-ink font-medium">{sumNN}</td>
          </tr>
        </tbody>
      </table>
      <div className="px-2 py-2 font-mono text-[12px] text-ink2 bg-paper border-t border-rule leading-relaxed space-y-0.5">
        <div>N(N &minus; 1) = {N} &times; {N - 1} = {denom}</div>
        <div>
          D = 1 &minus; ({sumNN} &divide; {denom}) =
          <span className="text-ink font-serif text-[16px] ml-1">
            {fmt(D, 3)}
          </span>
        </div>
      </div>
    </div>
  );
}
