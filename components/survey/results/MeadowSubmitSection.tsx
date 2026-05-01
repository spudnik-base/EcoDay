"use client";

import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import SubmitButton from "./SubmitButton";
import { buildMeadowPayload, submitMeadow } from "@/lib/submission";
import type { SurveyState } from "@/lib/types";

type Props = {
  state: SurveyState;
  onResetMeadow: () => void;
};

export default function MeadowSubmitSection({ state, onResetMeadow }: Props) {
  return (
    <Card>
      <SpecLabel>Submit meadow survey</SpecLabel>
      <p className="font-mono text-[10px] text-ink3 leading-relaxed mb-2">
        Sends one row tagged meadow: site type (marsh / drained), and
        percent cover for each quadrat species A through P.
      </p>
      <SubmitButton
        label="Submit meadow"
        submit={() => submitMeadow(state)}
        snapshot={() => JSON.stringify(buildMeadowPayload(state))}
        watch={state}
      />
      <button
        onClick={onResetMeadow}
        className="w-full mt-2 font-mono uppercase tracking-spec text-[10px] text-ink3 hover:text-ink py-1.5 border border-rule"
      >
        Reset meadow for next quadrat
      </button>
    </Card>
  );
}
