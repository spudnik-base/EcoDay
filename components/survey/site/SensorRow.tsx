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
    <div className="flex items-center py-2.5 border-b border-rule/60 last:border-b-0">
      <div className="flex-1">
        <div className="text-[10px] font-mono uppercase tracking-spec text-ink3">
          {label}
        </div>
        <div
          className={[
            "font-mono text-[14px] mt-0.5",
            ok ? "text-teal" : "text-ink4"
          ].join(" ")}
        >
          {statusText(status, value, unit)}
        </div>
      </div>
      <button
        onClick={onCapture}
        className={[
          "font-mono uppercase tracking-spec text-[10px] px-3 py-2 border-[0.5px]",
          ok
            ? "border-teal text-teal bg-teal2"
            : "border-rule text-ink3 bg-paper2/30 hover:text-ink"
        ].join(" ")}
      >
        {ok ? "re-read" : "capture"}
      </button>
    </div>
  );
}
