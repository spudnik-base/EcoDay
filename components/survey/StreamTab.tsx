"use client";

import { useState } from "react";
import SubTabBar from "@/components/shared/SubTabBar";
import SetupSection from "./stream/SetupSection";
import AbioticSection from "./stream/AbioticSection";
import BioticSection from "./stream/BioticSection";
import ResultsSection from "./stream/ResultsSection";
import type { UseSurveyState } from "@/lib/useSurveyState";

const SUB_TABS = ["Setup", "Abiotic", "Biotic", "Results"] as const;

type Props = { survey: UseSurveyState };

export default function StreamTab({ survey }: Props) {
  const [sub, setSub] = useState(0);
  return (
    <div className="pb-20">
      <SubTabBar tabs={SUB_TABS} active={sub} onChange={setSub} />
      {sub === 0 && <SetupSection survey={survey} />}
      {sub === 1 && <AbioticSection survey={survey} />}
      {sub === 2 && <BioticSection survey={survey} />}
      {sub === 3 && <ResultsSection survey={survey} />}
    </div>
  );
}
