"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { submitToSheets, buildPayload } from "@/lib/submission";
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
  const submittedSnapshot = useRef<string | null>(null);

  // Auto-rearm: if the user changes any value after a successful submit,
  // reset to idle so the button becomes usable again. Avoids accidentally
  // sending a duplicate row on a single tap, while letting groups correct
  // a value and resubmit if they need to.
  useEffect(() => {
    if (status !== "ok") return;
    const current = JSON.stringify(buildPayload(state));
    if (current !== submittedSnapshot.current) {
      setStatus("idle");
      submittedSnapshot.current = null;
    }
  }, [state, status]);

  async function go() {
    setStatus("loading");
    try {
      const snapshot = JSON.stringify(buildPayload(state));
      await submitToSheets(state);
      submittedSnapshot.current = snapshot;
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Button
      variant={variantFor[status]}
      onClick={go}
      disabled={status === "loading" || status === "ok"}
    >
      {labels[status]}
    </Button>
  );
}
