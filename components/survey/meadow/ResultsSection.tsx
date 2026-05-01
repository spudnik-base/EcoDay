"use client";

import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import Disclosure from "@/components/ui/Disclosure";
import SimpsonCalcDetails from "../results/SimpsonCalcDetails";
import MeadowSubmitSection from "../results/MeadowSubmitSection";
import SimpsonInterpretation from "../SimpsonInterpretation";
import { MEADOW_LABELS } from "@/lib/constants";
import { fmt, simpsonsD } from "@/lib/calculations";
import type { UseSurveyState } from "@/lib/useSurveyState";

type Props = { survey: UseSurveyState };

export default function ResultsSection({ survey }: Props) {
  const { state, resetMeadow } = survey;
  const dMeadow = simpsonsD(MEADOW_LABELS.map((l) => state.mdw.cover[l] ?? ""));
  const meadowRows = MEADOW_LABELS.map((l) => ({
    name: `Species ${l}`,
    n:    Math.round((parseFloat(state.mdw.cover[l] ?? "0") || 0) / 4)
  }));

  return (
    <div className="space-y-2">
      <Card>
        <SpecLabel>Simpson&apos;s D, meadow</SpecLabel>
        <div className="font-serif text-[36px] leading-none text-ink">
          {fmt(dMeadow, 3) || "·"}
        </div>
        <p className="font-mono text-[10px] text-ink3 mt-2 leading-relaxed">
          Cover values are converted to quadrat-square counts (each square =
          4%) before D is calculated.
        </p>
        <Disclosure label="show calculation">
          <SimpsonCalcDetails
            rows={meadowRows}
            unitLabel="n (squares)"
            countNoun="quadrat squares"
          />
        </Disclosure>
        <Disclosure label="how to interpret">
          <SimpsonInterpretation />
        </Disclosure>
      </Card>
      <Card>
        <SpecLabel>Why marsh vs drained matters</SpecLabel>
        <p className="font-serif text-[13px] text-ink leading-relaxed">
          The two meadow types tell different stories about land use.
        </p>
        <Disclosure label="ecological context">
          <div className="space-y-2">
            <p className="font-serif text-[13px] text-ink leading-relaxed">
              <span className="font-medium">Marsh (ungrazed):</span> wet soil,
              undisturbed by livestock. Specialist wetland plants persist.
              Rich vertical structure, varied microhabitats.
            </p>
            <p className="font-serif text-[13px] text-ink leading-relaxed">
              <span className="font-medium">Drained (grazed):</span> drier
              soil, regularly cropped by cattle, trampled. Selective grazing
              removes palatable species; trampling compacts the soil. Often
              dominated by a few resilient species.
            </p>
            <p className="font-serif text-[13px] text-ink3 leading-relaxed">
              The class&apos;s combined data lets us test whether grazed
              meadow really has lower diversity than ungrazed at our site.
            </p>
          </div>
        </Disclosure>
      </Card>
      <MeadowSubmitSection state={state} onResetMeadow={resetMeadow} />
    </div>
  );
}
