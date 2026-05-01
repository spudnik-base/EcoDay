"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

type Status = "idle" | "loading" | "ok" | "error";

type Props = {
  // human label for idle state ("Submit stream", "Submit meadow")
  label: string;
  // performs the network call
  submit: () => Promise<void>;
  // returns a string snapshot of the relevant state slice. If this string
  // changes after a successful submit, the button auto-rearms back to idle
  // so the next submit can fire.
  snapshot: () => string;
  // a watch value that, when it changes, should re-evaluate the snapshot.
  // Pass anything stable that updates when the slice updates.
  watch: unknown;
};

const variantFor: Record<Status, "primary" | "ok" | "fail"> = {
  idle:    "primary",
  loading: "primary",
  ok:      "ok",
  error:   "fail"
};

export default function SubmitButton({ label, submit, snapshot, watch }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const submitted = useRef<string | null>(null);

  // Auto-rearm: if any value in the watched slice changes after a
  // successful submit, the button becomes available again. Stops a stray
  // double-tap from creating a duplicate row, but keeps re-submission
  // possible after correcting a value or moving to another site.
  useEffect(() => {
    if (status !== "ok") return;
    if (snapshot() !== submitted.current) {
      setStatus("idle");
      submitted.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, status]);

  async function go() {
    setStatus("loading");
    try {
      const snap = snapshot();
      await submit();
      submitted.current = snap;
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  const label_ =
    status === "loading" ? "Submitting..."
    : status === "ok"    ? `${label.replace("Submit ", "")} sent`
    : status === "error" ? "Failed. Try CSV"
    : label;

  return (
    <Button
      variant={variantFor[status]}
      onClick={go}
      disabled={status === "loading" || status === "ok"}
    >
      {label_}
    </Button>
  );
}
