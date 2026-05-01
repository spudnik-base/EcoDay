"use client";

import { useState } from "react";
import Header from "@/components/shared/Header";
import TabBar from "@/components/shared/TabBar";
import TopNav from "@/components/shared/TopNav";
import SiteTab from "@/components/survey/SiteTab";
import AbioticTab from "@/components/survey/AbioticTab";
import BioticTab from "@/components/survey/BioticTab";
import MeadowTab from "@/components/survey/MeadowTab";
import ResultsTab from "@/components/survey/ResultsTab";
import ChiSquaredTab from "@/components/survey/ChiSquaredTab";
import { CONFIG } from "@/lib/config";
import { bioticIndex, fmt, qualityOf, simpsonsD } from "@/lib/calculations";
import { MEADOW_LABELS } from "@/lib/constants";
import { useSurveyState } from "@/lib/useSurveyState";

const TABS = ["Site", "Abiotic", "Biotic", "Meadow", "Results", "Chi sq"] as const;
const MEADOW_TAB = 3;

export default function SurveyPage() {
  const [tab, setTab] = useState(0);
  const survey = useSurveyState();
  const { state } = survey;
  const onMeadow = tab === MEADOW_TAB;

  const bi = bioticIndex(state.bio);
  const quality = qualityOf(bi);
  const dMeadow = simpsonsD(MEADOW_LABELS.map((l) => state.mdw.cover[l] ?? ""));

  const streamSubtitle = [
    state.group ? `Group ${state.group}` : "set group",
    state.site ? `Site ${state.site}` : null,
    state.flow,
    state.gps.alt ? `${state.gps.alt} m` : null
  ]
    .filter(Boolean)
    .join(" · ");

  const meadowSubtitle = [
    state.group ? `Group ${state.group}` : "set group",
    state.mdw.site === "marsh" ? "marsh (ungrazed)" : "drained (grazed)"
  ]
    .filter(Boolean)
    .join(" · ");

  const streamBadge =
    bi !== null && quality
      ? { text: `BI ${fmt(bi, 1)}`, bg: quality.bg, fg: quality.fg, border: quality.border }
      : null;

  const meadowBadge =
    dMeadow !== null
      ? {
          text: `D ${fmt(dMeadow, 2)}`,
          bg: "#E4EAD2",
          fg: "#3C5518",
          border: "#9DB272"
        }
      : null;

  return (
    <main className="max-w-[460px] mx-auto px-3 pb-16 pt-3">
      <TopNav current="survey" />
      <Header
        eyebrow={onMeadow ? "Field journal, meadow" : "Field journal, river"}
        title={
          onMeadow
            ? `Meadow survey ${CONFIG.YEAR}`
            : `Stream survey ${CONFIG.YEAR}`
        }
        subtitle={onMeadow ? meadowSubtitle : streamSubtitle}
        badge={onMeadow ? meadowBadge : streamBadge}
      />
      <TabBar tabs={TABS} active={tab} onChange={setTab} />
      <div className="bg-paper border border-rule border-t-0 px-3.5 pt-3.5 pb-2">
        {tab === 0 && <SiteTab survey={survey} />}
        {tab === 1 && <AbioticTab survey={survey} />}
        {tab === 2 && <BioticTab survey={survey} />}
        {tab === 3 && <MeadowTab survey={survey} />}
        {tab === 4 && <ResultsTab survey={survey} />}
        {tab === 5 && <ChiSquaredTab />}
      </div>
    </main>
  );
}
