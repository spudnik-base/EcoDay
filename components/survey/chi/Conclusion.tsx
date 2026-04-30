import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import { CRITICAL_CHI } from "@/lib/chiSquared";

type Props = {
  chi: number;
  reject: boolean;
  warnLowExpected: boolean;
  speciesLabel: string;
  labelA: string;
  labelB: string;
};

export default function Conclusion({
  chi,
  reject,
  warnLowExpected,
  speciesLabel,
  labelA,
  labelB
}: Props) {
  const verdict = reject
    ? { txt: "Reject H₀. The distribution is significantly different.", bg: "#E4EAD2", fg: "#3C5518", border: "#9DB272" }
    : { txt: "Fail to reject H₀. No significant difference at p = 0.05.", bg: "#F1DCD2", fg: "#7A2A12", border: "#C57A5C" };
  return (
    <>
      <Card>
        <SpecLabel>7. Compare to critical value</SpecLabel>
        <div className="font-mono text-[12px] text-ink2 leading-relaxed">
          <div>degrees of freedom (df) = k &minus; 1 = 2 &minus; 1 = <span className="text-ink">1</span></div>
          <div>critical &chi;&sup2; at p = 0.05, df = 1 = <span className="text-ink">{CRITICAL_CHI}</span></div>
          <div className="mt-2">
            your &chi;&sup2; = <span className="text-ink font-serif text-[18px]">{chi.toFixed(2)}</span>
            <span className="mx-2">{chi > CRITICAL_CHI ? ">" : "≤"}</span>
            <span className="text-ink">{CRITICAL_CHI}</span>
          </div>
        </div>
        <div
          className="inline-block mt-3 font-mono uppercase tracking-spec text-[10px] px-2 py-1"
          style={{ background: verdict.bg, color: verdict.fg, border: `0.5px solid ${verdict.border}` }}
        >
          {verdict.txt}
        </div>
        {warnLowExpected && (
          <div className="mt-3 font-mono text-[10px] text-sepia leading-relaxed">
            warning: an expected count is below 5. Cochran's rule says
            chi-squared may be unreliable here.
          </div>
        )}
      </Card>
      <Card>
        <SpecLabel>8. Interpret biologically</SpecLabel>
        <p className="font-serif text-[14px] text-ink leading-relaxed">
          What might explain the result for {speciesLabel} between {labelA} and {labelB}?
          Consider habitat preferences, water flow, oxygen, vegetation, grazing pressure.
        </p>
      </Card>
    </>
  );
}
