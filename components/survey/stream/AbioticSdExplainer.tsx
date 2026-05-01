import { ABIOTIC_FIELDS } from "@/lib/constants";
import { mean, stdDev } from "@/lib/calculations";
import type { SurveyState } from "@/lib/types";

type Props = { ab: SurveyState["ab"] };

function pickBestFactor(ab: SurveyState["ab"]) {
  for (const f of ABIOTIC_FIELDS) {
    const filled = ab[f.key].filter((v) => v !== "" && !Number.isNaN(Number(v)));
    if (filled.length >= 3) return { f, readings: filled };
  }
  for (const f of ABIOTIC_FIELDS) {
    const filled = ab[f.key].filter((v) => v !== "" && !Number.isNaN(Number(v)));
    if (filled.length >= 2) return { f, readings: filled };
  }
  return null;
}

export default function AbioticSdExplainer({ ab }: Props) {
  const pick = pickBestFactor(ab);
  if (!pick) {
    return (
      <p className="font-serif text-[13px] text-ink leading-relaxed">
        Once you enter at least two readings for any factor, this box will
        walk you through how the mean (x&#772;) and standard deviation (SD) are
        calculated using your own numbers.
      </p>
    );
  }
  const { f, readings } = pick;
  const ns = readings.map(Number);
  const m = mean(readings);
  const s = stdDev(readings);
  const n = ns.length;
  const devs = ns.map((x) => x - (m ?? 0));
  const sqDevs = devs.map((d) => d * d);
  const sumSq = sqDevs.reduce((a, b) => a + b, 0);
  const variance = n > 1 ? sumSq / (n - 1) : null;

  const fmt = (x: number, d = 3) => x.toFixed(d);

  return (
    <div className="space-y-2">
      <p className="font-serif text-[13px] text-ink leading-relaxed">
        Worked example using your <span className="font-medium">{f.label}</span>{" "}
        readings:
      </p>
      <div className="font-mono text-[11px] text-ink2 leading-relaxed bg-paper2/40 border border-rule p-2.5 space-y-1">
        <div>readings: {ns.join(", ")} {f.unit && <span className="text-ink4">({f.unit})</span>}</div>
        <div>
          x&#772; (mean) = ({ns.join(" + ")}) &divide; {n} =
          <span className="text-ink ml-1">{fmt(m ?? 0, 3)}</span>
        </div>
        <div>
          deviations (x &minus; x&#772;): {devs.map((d) => fmt(d, 3)).join(", ")}
        </div>
        <div>
          squared deviations: {sqDevs.map((d) => fmt(d, 4)).join(", ")}
        </div>
        <div>sum of squared deviations = {fmt(sumSq, 4)}</div>
        {variance !== null && (
          <>
            <div>
              variance = sum &divide; (n &minus; 1) = {fmt(sumSq, 4)} &divide;{" "}
              {n - 1} = {fmt(variance, 4)}
            </div>
            <div>
              SD = &radic;variance ={" "}
              <span className="text-ink">{fmt(s ?? 0, 3)}</span>
            </div>
          </>
        )}
      </div>
      <p className="font-serif text-[12px] text-ink3 leading-relaxed">
        Roughly, about two-thirds of normally distributed readings sit within
        &plusmn; 1 SD of the mean. A small SD means your three readings agree
        well; a large SD means they spread.
      </p>
    </div>
  );
}
