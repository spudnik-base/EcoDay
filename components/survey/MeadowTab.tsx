"use client";

import MeadowSiteToggle from "./meadow/MeadowSiteToggle";
import CoverInput from "./meadow/CoverInput";
import MeadowSubmitSection from "./results/MeadowSubmitSection";
import { MEADOW_LABELS } from "@/lib/constants";
import type { UseSurveyState } from "@/lib/useSurveyState";

type Props = { survey: UseSurveyState };

export default function MeadowTab({ survey }: Props) {
  const { state, setMeadowSite, setMeadowCover, resetMeadow } = survey;
  return (
    <div className="pb-20">
      <MeadowSiteToggle value={state.mdw.site} onChange={setMeadowSite} />
      <p className="text-[11px] font-mono text-ink3 leading-relaxed mb-2">
        Percent cover per species. Each quadrat square = 4%.
      </p>
      <div className="grid grid-cols-2 gap-1.5 mb-3">
        {MEADOW_LABELS.map((l) => (
          <CoverInput
            key={l}
            letter={l}
            value={state.mdw.cover[l] ?? ""}
            onChange={(v) => setMeadowCover(l, v)}
          />
        ))}
      </div>
      <MeadowSubmitSection state={state} onResetMeadow={resetMeadow} />
    </div>
  );
}
