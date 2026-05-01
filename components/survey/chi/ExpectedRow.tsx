import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";

type Props = {
  sp1: string; sp2: string;
  row1: number; row2: number;
  colA: number; colB: number;
  N: number;
  ea: number; eb: number; ec: number; ed: number;
};

function f(n: number, d = 2): string {
  return n.toFixed(d);
}

export default function ExpectedRow({
  sp1, sp2,
  row1, row2, colA, colB, N,
  ea, eb, ec, ed
}: Props) {
  return (
    <Card>
      <SpecLabel>6. Expected values, under H&#8320;</SpecLabel>
      <p className="font-serif text-[13px] text-ink leading-relaxed mb-2">
        If presence of {sp1} is independent of presence of {sp2}, the expected
        count in each cell is (row total &times; column total) &divide; N.
      </p>
      <div className="font-mono text-[11px] text-ink2 mb-3 space-y-0.5 leading-relaxed">
        <div>E[both present]   = ({row1} &times; {colA}) &divide; {N} = {f(ea)}</div>
        <div>E[only {sp1}]     = ({row1} &times; {colB}) &divide; {N} = {f(eb)}</div>
        <div>E[only {sp2}]     = ({row2} &times; {colA}) &divide; {N} = {f(ec)}</div>
        <div>E[both absent]    = ({row2} &times; {colB}) &divide; {N} = {f(ed)}</div>
      </div>
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
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-rule/60">
              <td className="px-2 py-1.5 text-ink2 font-sans">{sp1} present</td>
              <td className="px-2 py-1.5 text-right text-teal">{f(ea)}</td>
              <td className="px-2 py-1.5 text-right text-teal">{f(eb)}</td>
            </tr>
            <tr>
              <td className="px-2 py-1.5 text-ink2 font-sans">{sp1} absent</td>
              <td className="px-2 py-1.5 text-right text-teal">{f(ec)}</td>
              <td className="px-2 py-1.5 text-right text-teal">{f(ed)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
