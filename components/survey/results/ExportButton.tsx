"use client";

import Button from "@/components/ui/Button";
import { downloadCsv } from "@/lib/csvExport";
import type { SurveyState } from "@/lib/types";

type Props = { state: SurveyState };

export default function ExportButton({ state }: Props) {
  return (
    <Button variant="ghost" onClick={() => downloadCsv(state)}>
      Export CSV
    </Button>
  );
}
