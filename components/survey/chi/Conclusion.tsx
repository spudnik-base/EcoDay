import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import { CRITICAL_CHI } from "@/lib/chiSquared";

type Props = {
  chi: number;
  reject: boolean;
  positive: boolean;
  warnLowExpected: boolean;
  sp1: string;
  sp2: string;
};

export default function Conclusion({
  chi,
  reject,
  positive,
  warnLowExpected,
  sp1,
  sp2
}: Props) {
  let verdict: { txt: string; bg: string; fg: string; border: string };
  if (!reject) {
    verdict = {
      txt: "Fail to reject H₀. No evidence of association at p = 0.05.",
      bg: "#F1DCD2", fg: "#7A2A12", border: "#C57A5C"
    };
  } else if (positive) {
    verdict = {
      txt: "Reject H₀. Positive association: they tend to occur together.",
      bg: "#E4EAD2", fg: "#3C5518", border: "#9DB272"
    };
  } else {
    verdict = {
      txt: "Reject H₀. Negative association: they tend to avoid each other.",
      bg: "#F0E3CB", fg: "#6C4A0E", border: "#C49B4A"
    };
  }
  return (
    <>
      <Card>
        <SpecLabel>8. Compare to critical value</SpecLabel>
        <div className="font-mono text-[12px] text-ink2 leading-relaxed">
          <div>
            degrees of freedom (df) = (rows &minus; 1) &times; (cols &minus; 1) =
            1 &times; 1 = <span className="text-ink">1</span>
          </div>
          <div>critical &chi;&sup2; at p = 0.05, df = 1 = <span className="text-ink">{CRITICAL_CHI}</span></div>
          <div className="mt-2">
            your &chi;&sup2; = <span className="text-ink font-serif text-[18px]">{chi.toFixed(2)}</span>
            <span className="mx-2">{chi > CRITICAL_CHI ? ">" : "≤"}</span>
            <span className="text-ink">{CRITICAL_CHI}</span>
          </div>
        </div>
        <div
          className="inline-block mt-3 font-mono uppercase tracking-spec text-[10px] px-2 py-1"
          style={{ background: verdict.bg, color: verdict.fg, border: `1px solid ${verdict.border}` }}
        >
          {verdict.txt}
        </div>
        {warnLowExpected && (
          <div className="mt-3 font-mono text-[10px] text-sepia leading-relaxed">
            warning: at least one expected count is below 5. Cochran&apos;s rule
            says chi-squared may be unreliable for small expected counts.
          </div>
        )}
      </Card>
      <Card>
        <SpecLabel>9. Interpret biologically</SpecLabel>
        <p className="font-serif text-[14px] text-ink leading-relaxed">
          {reject && positive && (
            <>If {sp1} and {sp2} co-occur more than chance predicts, what habitat or
            water-quality conditions might both species need? Shared food source,
            substrate, oxygen tolerance?</>
          )}
          {reject && !positive && (
            <>If {sp1} and {sp2} avoid each other, what might explain it? Different
            tolerances, competition, predation, microhabitat preference?</>
          )}
          {!reject && (
            <>No significant association does not mean no relationship at all. With
            more class data the result could change. What habitat factors would
            you expect to link {sp1} and {sp2} if any?</>
          )}
        </p>
        <p className="font-serif text-[14px] text-ink leading-relaxed mt-3">
          Try a different pair of species. Does the conclusion hold, or does
          another pair behave differently?
        </p>
      </Card>
    </>
  );
}
