"use client";

import { useState } from "react";
import SubTabBar from "@/components/shared/SubTabBar";
import SurveySection from "./meadow/SurveySection";
import ResultsSection from "./meadow/ResultsSection";
import type { UseSurveyState } from "@/lib/useSurveyState";

const SUB_TABS = ["Survey", "Results"] as const;

type Props = { survey: UseSurveyState };

export default function MeadowTab({ survey }: Props) {
  const [sub, setSub] = useState(0);
  return (
    <div className="pb-20">
      <SubTabBar tabs={SUB_TABS} active={sub} onChange={setSub} />
      {sub === 0 && <SurveySection survey={survey} />}
      {sub === 1 && <ResultsSection survey={survey} />}
    </div>
  );
}
