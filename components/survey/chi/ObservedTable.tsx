import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";

type Props = {
  labelA: string;
  labelB: string;
  oA: number;
  oB: number;
  nA: number;
  nB: number;
  habitatHint: string;
};

export default function ObservedTable({
  labelA,
  labelB,
  oA,
  oB,
  nA,
  nB,
  habitatHint
}: Props) {
  return (
    <Card>
      <SpecLabel>4. Observed values, from class data</SpecLabel>
      <div className="grid grid-cols-3 gap-2 mb-2 font-mono text-[11px] text-ink3">
        <div></div>
        <div className="text-center">{labelA}</div>
        <div className="text-center">{labelB}</div>
      </div>
      <div className="grid grid-cols-3 gap-2 items-center py-1.5 border-t border-rule/60">
        <div className="font-mono text-[11px] text-ink3">Observed</div>
        <div className="text-center font-serif text-[24px] text-ink">{oA}</div>
        <div className="text-center font-serif text-[24px] text-ink">{oB}</div>
      </div>
      <div className="grid grid-cols-3 gap-2 items-center py-1.5 border-t border-rule/60">
        <div className="font-mono text-[11px] text-ink3">Submissions</div>
        <div className="text-center font-mono text-[12px] text-ink2">{nA}</div>
        <div className="text-center font-mono text-[12px] text-ink2">{nB}</div>
      </div>
      <p className="font-mono text-[10px] text-ink4 mt-2 leading-relaxed">
        {habitatHint}
      </p>
    </Card>
  );
}
