"use client";

import { useState } from "react";
import Header from "@/components/shared/Header";
import TabBar from "@/components/shared/TabBar";
import SiteTab from "@/components/survey/SiteTab";
import AbioticTab from "@/components/survey/AbioticTab";
import BioticTab from "@/components/survey/BioticTab";
import MeadowTab from "@/components/survey/MeadowTab";
import ResultsTab from "@/components/survey/ResultsTab";
import { CONFIG } from "@/lib/config";
import { bioticIndex, fmt, qualityOf } from "@/lib/calculations";
import { useSurveyState } from "@/lib/useSurveyState";

const TABS = ["Site", "Abiotic", "Biotic", "Meadow", "Results"] as const;

export default function SurveyPage() {
  const [tab, setTab] = useState(0);
  const survey = useSurveyState();
  const { state } = survey;

  const bi = bioticIndex(state.bio);
  const quality = qualityOf(bi);
  const subtitle = [
    state.group ? `Group ${state.group}` : "set group",
    state.site ? `Site ${state.site}` : null,
    state.flow,
    state.gps.alt ? `${state.gps.alt} m` : null
  ]
    .filter(Boolean)
    .join(" · ");

  const badge =
    bi !== null && quality
      ? { text: `BI ${fmt(bi, 1)}`, bg: quality.bg, fg: quality.fg, border: quality.border }
      : null;

  return (
    <main className="max-w-[460px] mx-auto px-3 pb-16 pt-3">
      <Header
        eyebrow="Field journal"
        title={`Stream survey ${CONFIG.YEAR}`}
        subtitle={subtitle}
        badge={badge}
      />
      <TabBar tabs={TABS} active={tab} onChange={setTab} />
      <div className="bg-paper border-[0.5px] border-rule border-t-0 px-3.5 pt-3.5 pb-2">
        {tab === 0 && <SiteTab survey={survey} />}
        {tab === 1 && <AbioticTab survey={survey} />}
        {tab === 2 && <BioticTab survey={survey} />}
        {tab === 3 && <MeadowTab survey={survey} />}
        {tab === 4 && <ResultsTab survey={survey} />}
      </div>
    </main>
  );
}
