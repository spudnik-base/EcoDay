"use client";

import ChiSection from "./analysis/ChiSection";
import PoolRiffleContext from "./analysis/PoolRiffleContext";
import ClassGlance from "./analysis/ClassGlance";
import AdminCard from "./analysis/AdminCard";
import { CONFIG } from "@/lib/config";
import { useClassData } from "@/lib/useClassData";
import type { UseSurveyState } from "@/lib/useSurveyState";

type Props = { survey: UseSurveyState };

export default function AnalysisTab({ survey }: Props) {
  const stream = useClassData(CONFIG.WEBHOOK_URL_STREAM, false);
  const meadow = useClassData(CONFIG.WEBHOOK_URL_MEADOW, false);

  // For chi-squared we want a unified refresh across both URLs.
  const status =
    stream.status === "loading" || meadow.status === "loading"
      ? "loading"
      : stream.status === "error" || meadow.status === "error"
      ? "error"
      : stream.status;
  function refresh() {
    stream.refresh();
    meadow.refresh();
  }

  return (
    <div className="pb-20 space-y-2">
      <ChiSection
        streamRows={stream.rows}
        meadowRows={meadow.rows}
        status={status}
        refresh={refresh}
      />
      <PoolRiffleContext />
      <ClassGlance streamRows={stream.rows} meadowRows={meadow.rows} />
      <AdminCard survey={survey} />
    </div>
  );
}
