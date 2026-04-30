import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";

type Props = {
  sp1: string;
  sp2: string;
  universe: string;
  a: number; b: number; c: number; d: number;
  row1: number; row2: number;
  colA: number; colB: number;
  N: number;
};

export default function ObservedTable({
  sp1, sp2, universe,
  a, b, c, d,
  row1, row2, colA, colB, N
}: Props) {
  return (
    <Card>
      <SpecLabel>5. Observed values, from class data</SpecLabel>
      <p className="font-mono text-[10px] text-ink3 leading-relaxed mb-2">
        Each cell counts how many {universe} fell into that combination of
        present and absent.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-[12px] border-collapse">
          <thead>
            <tr>
              <th className="px-2 py-1.5"></th>
              <th className="text-right text-ink2 font-medium px-2 py-1.5 border-b border-rule">
                {sp2} present
              </th>
              <th className="text-right text-ink2 font-medium px-2 py-1.5 border-b border-rule">
                {sp2} absent
              </th>
              <th className="text-right text-ink2 font-medium px-2 py-1.5 border-b border-rule">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-rule/60">
              <td className="px-2 py-1.5 text-ink2 font-sans">{sp1} present</td>
              <td className="px-2 py-1.5 text-right text-ink">{a}</td>
              <td className="px-2 py-1.5 text-right text-ink">{b}</td>
              <td className="px-2 py-1.5 text-right text-ink2">{row1}</td>
            </tr>
            <tr className="border-b border-rule/60">
              <td className="px-2 py-1.5 text-ink2 font-sans">{sp1} absent</td>
              <td className="px-2 py-1.5 text-right text-ink">{c}</td>
              <td className="px-2 py-1.5 text-right text-ink">{d}</td>
              <td className="px-2 py-1.5 text-right text-ink2">{row2}</td>
            </tr>
            <tr className="bg-paper2/40 border-t border-ink2">
              <td className="px-2 py-2 text-ink2 uppercase tracking-spec text-[10px]">
                Total
              </td>
              <td className="px-2 py-2 text-right text-ink font-medium">{colA}</td>
              <td className="px-2 py-2 text-right text-ink font-medium">{colB}</td>
              <td className="px-2 py-2 text-right text-ink font-medium">{N}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="font-mono text-[10px] text-ink4 mt-2 leading-relaxed">
        Stream: present means count &gt; 0 in the kick sample. Meadow: present
        means &gt; 0% cover in the quadrat.
      </p>
    </Card>
  );
}
