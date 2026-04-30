import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";

type Props = { speciesLabel: string; labelA: string; labelB: string };

export default function Hypotheses({ speciesLabel, labelA, labelB }: Props) {
  return (
    <Card>
      <SpecLabel>3. State the hypotheses</SpecLabel>
      <div className="space-y-2 text-[13px]">
        <p className="font-serif text-ink leading-relaxed">
          <span className="font-mono text-[11px] text-ink3 mr-2">H&#8320;</span>
          The number of {speciesLabel} is the same in {labelA} and {labelB} sites.
        </p>
        <p className="font-serif text-ink leading-relaxed">
          <span className="font-mono text-[11px] text-ink3 mr-2">H&#8321;</span>
          The number of {speciesLabel} differs between {labelA} and {labelB} sites.
        </p>
      </div>
    </Card>
  );
}
