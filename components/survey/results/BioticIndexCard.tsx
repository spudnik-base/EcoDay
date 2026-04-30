import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import Disclosure from "@/components/ui/Disclosure";
import BioticCalcDetails from "./BioticCalcDetails";
import { fmt, qualityOf } from "@/lib/calculations";
import type { SurveyState } from "@/lib/types";

type Props = {
  bi: number | null;
  site: string;
  flow: string;
  bio: SurveyState["bio"];
};

export default function BioticIndexCard({ bi, site, flow, bio }: Props) {
  const q = qualityOf(bi);
  return (
    <Card>
      <SpecLabel>{`Biotic index (site ${site || "?"} / ${flow})`}</SpecLabel>
      <div className="font-serif text-[52px] leading-none tracking-tight text-ink">
        {bi !== null ? fmt(bi) : "·"}
      </div>
      {q && (
        <div
          className="inline-block mt-2 font-mono uppercase tracking-spec text-[10px] px-2 py-1"
          style={{ background: q.bg, color: q.fg, border: `1px solid ${q.border}` }}
        >
          {q.txt}
        </div>
      )}
      <div className="font-mono text-[10px] text-ink3 mt-2">
        &Sigma;(n &times; tolerance) &divide; N total organisms
      </div>
      <Disclosure label="calculation">
        <BioticCalcDetails bio={bio} />
      </Disclosure>
    </Card>
  );
}
