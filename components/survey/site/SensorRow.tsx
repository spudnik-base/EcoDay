"use client";

import type { SensorStatus } from "@/lib/types";

type Props = {
  label: string;
  value: string | number | null;
  unit: string;
  status: SensorStatus;
  onCapture: () => void;
};

function statusText(status: SensorStatus, value: string | number | null, unit: string) {
  if (status === "ok" && value != null) return `${value}${unit}`;
  if (status === "loading") return "reading...";
  if (status === "error") return "unavailable";
  if (status === "unsupported") return "not on this device";
  return "";
}

export default function SensorRow({ label, value, unit, status, onCapture }: Props) {
  const ok = status === "ok";
  return (
    <div className="flex items-center py-2.5 border-b border-rule/70 last:border-b-0">
      <div className="flex-1">
        <div className="text-[11px] font-mono uppercase tracking-spec font-medium text-ink2">
          {label}
        </div>
        <div
          className={[
            "font-mono text-[14px] mt-0.5",
            ok ? "text-teal font-medium" : "text-ink3"
          ].join(" ")}
        >
          {statusText(status, value, unit)}
        </div>
      </div>
      <button
        onClick={onCapture}
        className={[
          "font-mono uppercase tracking-spec text-[11px] font-medium px-3 py-2 border",
          ok
            ? "border-teal text-teal bg-teal2"
            : "border-rule text-ink2 bg-paper hover:border-ink"
        ].join(" ")}
      >
        {ok ? "re-read" : "capture"}
      </button>
    </div>
  );
}
