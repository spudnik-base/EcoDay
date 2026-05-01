"use client";

import { useState } from "react";
import Header from "@/components/shared/Header";
import TabBar from "@/components/shared/TabBar";
import TopNav from "@/components/shared/TopNav";
import StatusBar from "@/components/dashboard/StatusBar";
import MeadowOverviewTab from "@/components/dashboard/MeadowOverviewTab";
import MeadowSummaryTab from "@/components/dashboard/MeadowSummaryTab";
import MeadowDataTable from "@/components/dashboard/meadow/MeadowDataTable";
import { CONFIG } from "@/lib/config";
import { fmt } from "@/lib/calculations";
import { meadowDiversityStats } from "@/lib/meadowAggregations";
import { useClassData } from "@/lib/useClassData";

const TABS = ["Overview", "Summary", "Data"] as const;

export default function MeadowDashboardPage() {
  const [tab, setTab] = useState(0);
  const { rows, status, fetchedAt, countdown, refresh } = useClassData(
    CONFIG.WEBHOOK_URL_MEADOW,
    true
  );

  const div = meadowDiversityStats(rows);
  const badge =
    div.overall.mean !== null
      ? {
          text: `D ${fmt(div.overall.mean, 2)}`,
          bg: "#E4EAD2",
          fg: "#3C5518",
          border: "#9DB272"
        }
      : null;

  return (
    <main className="max-w-[920px] mx-auto px-4 pb-16 pt-4">
      <TopNav current="meadow" />
      <Header
        eyebrow="Meadow dashboard"
        title={`Meadow survey ${CONFIG.YEAR}`}
        subtitle="Live class results from the field"
        badge={badge}
        wide
      />
      <TabBar tabs={TABS} active={tab} onChange={setTab} />
      <div className="bg-paper border border-rule border-t-0 px-4 pt-2 pb-4">
        <StatusBar
          count={rows.length}
          status={status}
          fetchedAt={fetchedAt}
          countdown={countdown}
          onRefresh={refresh}
        />
        {tab === 0 && <MeadowOverviewTab rows={rows} />}
        {tab === 1 && <MeadowSummaryTab rows={rows} />}
        {tab === 2 && <MeadowDataTable rows={rows} />}
      </div>
    </main>
  );
}
