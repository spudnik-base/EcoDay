import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";

type Props = { oA: number; oB: number; eA: number; eB: number; labelA: string; labelB: string };

export default function ExpectedRow({ oA, oB, eA, eB, labelA, labelB }: Props) {
  const total = oA + oB;
  return (
    <Card>
      <SpecLabel>5. Expected values, under H&#8320;</SpecLabel>
      <p className="font-serif text-[13px] text-ink leading-relaxed mb-2">
        If the species were equally distributed, you would expect the same count
        in each habitat: total &divide; 2.
      </p>
      <div className="font-mono text-[12px] text-ink2 mb-3">
        E = ({oA} + {oB}) &divide; 2 = {total} &divide; 2 = {(total / 2).toFixed(1)}
      </div>
      <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-ink3">
        <div></div>
        <div className="text-center">{labelA}</div>
        <div className="text-center">{labelB}</div>
      </div>
      <div className="grid grid-cols-3 gap-2 items-center py-1.5 border-t border-rule/60">
        <div className="font-mono text-[11px] text-ink3">Expected</div>
        <div className="text-center font-serif text-[20px] text-teal">{eA.toFixed(1)}</div>
        <div className="text-center font-serif text-[20px] text-teal">{eB.toFixed(1)}</div>
      </div>
    </Card>
  );
}
