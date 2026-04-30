import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";

type Props = {
  oA: number;
  oB: number;
  eA: number;
  eB: number;
  chi: number;
  labelA: string;
  labelB: string;
};

function f(n: number, d = 2): string {
  return Number(n).toFixed(d);
}

export default function CalcTable({ oA, oB, eA, eB, chi, labelA, labelB }: Props) {
  const dA = oA - eA;
  const dB = oB - eB;
  const sA = (dA * dA) / eA;
  const sB = (dB * dB) / eB;
  return (
    <Card>
      <SpecLabel>6. Calculate &chi;&sup2;</SpecLabel>
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-[11px]">
          <thead>
            <tr className="text-ink3">
              <th className="text-left font-medium pb-1">Habitat</th>
              <th className="text-right font-medium pb-1">O</th>
              <th className="text-right font-medium pb-1">E</th>
              <th className="text-right font-medium pb-1">O&minus;E</th>
              <th className="text-right font-medium pb-1">(O&minus;E)&sup2;</th>
              <th className="text-right font-medium pb-1">(O&minus;E)&sup2;/E</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-rule/60">
              <td className="py-1.5 text-ink2">{labelA}</td>
              <td className="py-1.5 text-right text-ink">{oA}</td>
              <td className="py-1.5 text-right text-ink2">{f(eA, 1)}</td>
              <td className="py-1.5 text-right text-ink2">{f(dA, 1)}</td>
              <td className="py-1.5 text-right text-ink2">{f(dA * dA, 2)}</td>
              <td className="py-1.5 text-right text-teal">{f(sA)}</td>
            </tr>
            <tr className="border-t border-rule/60">
              <td className="py-1.5 text-ink2">{labelB}</td>
              <td className="py-1.5 text-right text-ink">{oB}</td>
              <td className="py-1.5 text-right text-ink2">{f(eB, 1)}</td>
              <td className="py-1.5 text-right text-ink2">{f(dB, 1)}</td>
              <td className="py-1.5 text-right text-ink2">{f(dB * dB, 2)}</td>
              <td className="py-1.5 text-right text-teal">{f(sB)}</td>
            </tr>
            <tr className="border-t-2 border-ink2">
              <td className="py-2 text-ink3 uppercase tracking-spec text-[10px]" colSpan={5}>
                &Sigma; (sum) = &chi;&sup2;
              </td>
              <td className="py-2 text-right font-serif text-[20px] text-ink">{f(chi)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
