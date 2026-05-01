"use client";

import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import Disclosure from "@/components/ui/Disclosure";
import SpeciesRow from "../biotic/SpeciesRow";
import ToleranceExplainer from "../biotic/ToleranceExplainer";
import { SPECIES } from "@/lib/constants";
import type { UseSurveyState } from "@/lib/useSurveyState";

type Props = { survey: UseSurveyState };

export default function BioticSection({ survey }: Props) {
  const { state, stepBio } = survey;
  return (
    <div>
      <Card>
        <SpecLabel>Kick sample</SpecLabel>
        <p className="font-serif text-[13px] text-ink leading-relaxed">
          Tap + and &minus; to count organisms from your kick sample.
        </p>
        <Disclosure label="how to take a kick sample">
          <p className="font-serif text-[13px] text-ink leading-relaxed">
            Stand in the stream facing downstream with a net held against the
            bed. Disturb the substrate just upstream by kicking and rubbing
            stones for around 30 seconds. Macroinvertebrates dislodge and wash
            into the net. Empty the net into a tray, identify and count.
            Replicate two or three times for a representative sample.
          </p>
        </Disclosure>
      </Card>
      <ToleranceExplainer />
      <Card>
        {SPECIES.map((sp, i) => (
          <SpeciesRow
            key={sp.id}
            name={sp.name}
            tol={sp.tol}
            count={state.bio[sp.id] || 0}
            onStep={(d) => stepBio(sp.id, d)}
            isLast={i === SPECIES.length - 1}
          />
        ))}
      </Card>
    </div>
  );
}
