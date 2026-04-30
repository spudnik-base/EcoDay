"use client";

import AbioticCard from "./abiotic/AbioticCard";
import { ABIOTIC_FIELDS } from "@/lib/constants";
import type { UseSurveyState } from "@/lib/useSurveyState";

type Props = { survey: UseSurveyState };

export default function AbioticTab({ survey }: Props) {
  const { state, setAbiotic } = survey;
  return (
    <div className="pb-20">
      <p className="text-[11px] font-mono text-ink3 leading-relaxed mb-3">
        Three readings per factor. Mean (x&#772;) and standard deviation (&plusmn;)
        update live.
      </p>
      {ABIOTIC_FIELDS.map((f) => (
        <AbioticCard
          key={f.key}
          factor={f}
          values={state.ab[f.key]}
          onChange={(i, v) => setAbiotic(f.key, i, v)}
        />
      ))}
    </div>
  );
}
