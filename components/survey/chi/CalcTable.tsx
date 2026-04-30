import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";

type Cell = { label: string; o: number; e: number; c: number };

type Props = {
  cells: [Cell, Cell, Cell, Cell];
  chi: number;
};

function f(n: number, d = 2): string {
  return n.toFixed(d);
}

export default function CalcTable({ cells, chi }: Props) {
  return (
    <Card>
      <SpecLabel>7. Calculate &chi;&sup2;</SpecLabel>
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-[11px] border-collapse">
          <thead>
            <tr className="text-ink3">
              <th className="text-left font-medium pb-1">Cell</th>
              <th className="text-right font-medium pb-1">O</th>
              <th className="text-right font-medium pb-1">E</th>
              <th className="text-right font-medium pb-1">O&minus;E</th>
              <th className="text-right font-medium pb-1">(O&minus;E)&sup2;/E</th>
            </tr>
          </thead>
          <tbody>
            {cells.map((cell, i) => {
              const d = cell.o - cell.e;
              return (
                <tr key={i} className="border-t border-rule/60">
                  <td className="py-1.5 pr-2 text-ink2 font-sans">{cell.label}</td>
                  <td className="py-1.5 px-2 text-right text-ink">{cell.o}</td>
                  <td className="py-1.5 px-2 text-right text-ink2">{f(cell.e)}</td>
                  <td className="py-1.5 px-2 text-right text-ink2">{f(d, 1)}</td>
                  <td className="py-1.5 pl-2 text-right text-teal">{f(cell.c)}</td>
                </tr>
              );
            })}
            <tr className="border-t-2 border-ink2">
              <td className="py-2 pr-2 text-ink3 uppercase tracking-spec text-[10px]" colSpan={4}>
                &Sigma; = &chi;&sup2;
              </td>
              <td className="py-2 pl-2 text-right font-serif text-[20px] text-ink">{f(chi)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
