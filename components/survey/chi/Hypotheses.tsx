import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";

type Props = {
  sp1: string;
  sp2: string;
  universe: string;
};

export default function Hypotheses({ sp1, sp2, universe }: Props) {
  return (
    <Card>
      <SpecLabel>4. State the hypotheses</SpecLabel>
      <div className="space-y-2 text-[13px]">
        <p className="font-serif text-ink leading-relaxed">
          <span className="font-mono text-[11px] text-ink3 mr-2">H&#8320;</span>
          {sp1} and {sp2} are independent: finding one tells you nothing about
          whether you will find the other in the same {universe.replace(/s$/, "")}.
        </p>
        <p className="font-serif text-ink leading-relaxed">
          <span className="font-mono text-[11px] text-ink3 mr-2">H&#8321;</span>
          {sp1} and {sp2} are associated: they tend to occur together (positive)
          or to avoid each other (negative).
        </p>
      </div>
    </Card>
  );
}
