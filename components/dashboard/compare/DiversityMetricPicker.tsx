"use client";

import {
  DIVERSITY_METRICS,
  type DiversityMetric
} from "@/lib/diversityMetrics";

type Props = {
  value: DiversityMetric;
  onChange: (m: DiversityMetric) => void;
};

export default function DiversityMetricPicker({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {DIVERSITY_METRICS.map((m) => {
        const active = value === m.key;
        return (
          <button
            key={m.key}
            onClick={() => onChange(m.key)}
            className={[
              "px-2.5 py-1.5 font-mono uppercase tracking-spec text-[10px] border transition-colors",
              active
                ? "border-ink border-2 bg-paper2 text-ink font-medium"
                : "border-rule bg-paper text-ink2 hover:border-ink"
            ].join(" ")}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
