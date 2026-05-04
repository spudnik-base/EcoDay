"use client";

import { FACTORS, type FactorKey } from "@/lib/abioticAggregations";

type Props = {
  value: FactorKey;
  onChange: (k: FactorKey) => void;
};

export default function FactorPicker({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {FACTORS.map((f) => {
        const active = value === f.key;
        return (
          <button
            key={f.key}
            onClick={() => onChange(f.key)}
            className={[
              "px-2.5 py-1.5 font-mono uppercase tracking-spec text-[10px] border transition-colors",
              active
                ? "border-ink border-2 bg-paper2 text-ink font-medium"
                : "border-rule bg-paper text-ink2 hover:border-ink"
            ].join(" ")}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
