"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { submitToSheets } from "@/lib/submission";
import type { SurveyState } from "@/lib/types";

type Status = "idle" | "loading" | "ok" | "error";

const labels: Record<Status, string> = {
  idle:    "Submit to Sheets",
  loading: "Submitting...",
  ok:      "Submitted",
  error:   "Failed. Try CSV"
};

const variantFor: Record<Status, "primary" | "ok" | "fail"> = {
  idle:    "primary",
  loading: "primary",
  ok:      "ok",
  error:   "fail"
};

type Props = { state: SurveyState };

export default function SubmitButton({ state }: Props) {
  const [status, setStatus] = useState<Status>("idle");

  async function go() {
    setStatus("loading");
    try {
      await submitToSheets(state);
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Button
      variant={variantFor[status]}
      onClick={go}
      disabled={status === "loading"}
    >
      {labels[status]}
    </Button>
  );
}
