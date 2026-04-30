import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import { ABIOTIC_FIELDS } from "@/lib/constants";
import { fmt, mean, stdDev } from "@/lib/calculations";
import type { SurveyState } from "@/lib/types";

type Props = { ab: SurveyState["ab"] };

export default function AbioticSummaryTable({ ab }: Props) {
  return (
    <Card>
      <SpecLabel>Abiotic summary</SpecLabel>
      <div className="grid grid-cols-[1fr_60px_60px] gap-x-2 gap-y-0 font-mono text-[12px]">
        <div className="text-[10px] text-ink4 pb-1"></div>
        <div className="text-[10px] text-ink4 pb-1">mean</div>
        <div className="text-[10px] text-ink4 pb-1">&plusmn; SD</div>
        {ABIOTIC_FIELDS.map((f) => {
          const m = mean(ab[f.key]);
          const s = stdDev(ab[f.key]);
          return (
            <div key={f.key} className="contents">
              <div className="text-ink3 py-1.5 border-t border-rule/50 font-sans text-[12px]">
                {f.label}
                {f.unit && (
                  <span className="text-ink4 ml-1">({f.unit})</span>
                )}
              </div>
              <div className="text-ink py-1.5 border-t border-rule/50">
                {fmt(m) || "·"}
              </div>
              <div className="text-ink4 py-1.5 border-t border-rule/50">
                {fmt(s) || "·"}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
