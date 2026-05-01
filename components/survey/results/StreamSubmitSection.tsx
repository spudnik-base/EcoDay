"use client";

import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import SubmitButton from "./SubmitButton";
import { buildStreamPayload, submitStream } from "@/lib/submission";
import type { SurveyState } from "@/lib/types";

type Props = {
  state: SurveyState;
  onResetStream: () => void;
};

export default function StreamSubmitSection({ state, onResetStream }: Props) {
  return (
    <Card>
      <SpecLabel>Submit stream survey</SpecLabel>
      <p className="font-mono text-[10px] text-ink3 leading-relaxed mb-2">
        Sends one row tagged stream: site, flow, GPS, abiotic readings,
        biotic counts, biotic index, Simpson&apos;s D.
      </p>
      <SubmitButton
        label="Submit stream"
        submit={() => submitStream(state)}
        snapshot={() => JSON.stringify(buildStreamPayload(state))}
        watch={state}
      />
      <button
        onClick={onResetStream}
        className="w-full mt-2 font-mono uppercase tracking-spec text-[10px] text-ink3 hover:text-ink py-1.5 border border-rule"
      >
        Reset stream for next site
      </button>
    </Card>
  );
}
