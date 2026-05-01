"use client";

import { useMemo, useState } from "react";
import Header from "@/components/shared/Header";
import TabBar from "@/components/shared/TabBar";
import TopNav from "@/components/shared/TopNav";
import StatusBar from "@/components/dashboard/StatusBar";
import OverviewTab from "@/components/dashboard/OverviewTab";
import SummaryTab from "@/components/dashboard/SummaryTab";
import SitesTab from "@/components/dashboard/SitesTab";
import CompareTab from "@/components/dashboard/CompareTab";
import DataTable from "@/components/dashboard/DataTable";
import { CONFIG } from "@/lib/config";
import { fmt, qualityOf } from "@/lib/calculations";
import { parseRow } from "@/lib/parseRow";
import { useClassData } from "@/lib/useClassData";

const TABS = ["Overview", "Summary", "Sites", "Compare", "Data"] as const;

export default function DashboardPage() {
  const [tab, setTab] = useState(0);
  const { rows, status, fetchedAt, countdown, refresh } = useClassData(
    CONFIG.WEBHOOK_URL_STREAM,
    true
  );

  const parsed = useMemo(() => rows.map(parseRow), [rows]);

  const validBI = parsed.filter((r) => !Number.isNaN(r.bi));
  const avgBI = validBI.length
    ? validBI.reduce((a, r) => a + r.bi, 0) / validBI.length
    : null;
  const q = qualityOf(avgBI);

  const badge =
    avgBI !== null && q
      ? { text: `Avg BI ${fmt(avgBI, 1)}`, bg: q.bg, fg: q.fg, border: q.border }
      : null;

  return (
    <main className="max-w-[920px] mx-auto px-4 pb-16 pt-4">
      <TopNav current="dashboard" />
      <Header
        eyebrow="Class dashboard"
        title={`Stream survey ${CONFIG.YEAR}`}
        subtitle="Live results from the field"
        badge={badge}
        wide
      />
      <TabBar tabs={TABS} active={tab} onChange={setTab} />
      <div className="bg-paper border border-rule border-t-0 px-4 pt-2 pb-4">
        <StatusBar
          count={parsed.length}
          status={status}
          fetchedAt={fetchedAt}
          countdown={countdown}
          onRefresh={refresh}
        />
        {tab === 0 && <OverviewTab rows={parsed} />}
        {tab === 1 && <SummaryTab rows={parsed} />}
        {tab === 2 && <SitesTab rows={parsed} />}
        {tab === 3 && <CompareTab rows={parsed} />}
        {tab === 4 && <DataTable rows={parsed} />}
      </div>
    </main>
  );
}
