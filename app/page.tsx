"use client";

import { useState } from "react";
import Header from "@/components/shared/Header";
import TabBar from "@/components/shared/TabBar";
import TopNav from "@/components/shared/TopNav";
import StreamTab from "@/components/survey/StreamTab";
import MeadowTab from "@/components/survey/MeadowTab";
import AnalysisTab from "@/components/survey/AnalysisTab";
import { CONFIG } from "@/lib/config";
import { bioticIndex, fmt, qualityOf, simpsonsD } from "@/lib/calculations";
import { MEADOW_LABELS } from "@/lib/constants";
import { useSurveyState } from "@/lib/useSurveyState";

const TABS = ["Stream", "Meadow", "Analysis"] as const;

export default function SurveyPage() {
  const [tab, setTab] = useState(0);
  const survey = useSurveyState();
  const { state } = survey;

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
      ? { text: `D ${fmt(dMeadow, 2)}`, bg: "#E4EAD2", fg: "#3C5518", border: "#9DB272" }
      : null;

  const config = (() => {
    if (tab === 0) {
      return {
        eyebrow: "Field journal, river",
        title: `Stream survey ${CONFIG.YEAR}`,
        subtitle: streamSubtitle,
        badge: streamBadge
      };
    }
    if (tab === 1) {
      return {
        eyebrow: "Field journal, meadow",
        title: `Meadow survey ${CONFIG.YEAR}`,
        subtitle: meadowSubtitle,
        badge: meadowBadge
      };
    }
    return {
      eyebrow: "Field journal, analysis",
      title: "Field-day analysis",
      subtitle: "test your data, see the class",
      badge: null
    };
  })();

  return (
    <main className="max-w-[460px] mx-auto px-3 pb-16 pt-3">
      <TopNav current="survey" />
      <Header
        eyebrow={config.eyebrow}
        title={config.title}
        subtitle={config.subtitle}
        badge={config.badge}
      />
      <TabBar tabs={TABS} active={tab} onChange={setTab} />
      <div className="bg-paper border border-rule border-t-0 px-3.5 pt-3.5 pb-2">
        {tab === 0 && <StreamTab survey={survey} />}
        {tab === 1 && <MeadowTab survey={survey} />}
        {tab === 2 && <AnalysisTab survey={survey} />}
      </div>
    </main>
  );
}
