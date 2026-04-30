"use client";

import Card from "@/components/ui/Card";
import SpeciesRow from "./biotic/SpeciesRow";
import { SPECIES } from "@/lib/constants";
import type { UseSurveyState } from "@/lib/useSurveyState";

type Props = { survey: UseSurveyState };

export default function BioticTab({ survey }: Props) {
  const { state, stepBio } = survey;
  return (
    <div className="pb-20">
      <p className="text-[11px] font-mono text-ink3 leading-relaxed mb-3">
        Tap + and &minus; to count organisms from your kick sample.
      </p>
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
