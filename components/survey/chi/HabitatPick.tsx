"use client";

import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import type { Habitat } from "@/lib/chiSquared";

type Props = { value: Habitat; onChange: (h: Habitat) => void };

const OPTIONS: ReadonlyArray<[Habitat, string, string]> = [
  ["stream", "Stream", "riffle vs pool"],
  ["meadow", "Meadow", "marsh vs drained"]
];

export default function HabitatPick({ value, onChange }: Props) {
  return (
    <Card>
      <SpecLabel>1. Pick a habitat to compare</SpecLabel>
      <div className="grid grid-cols-2 gap-2">
        {OPTIONS.map(([v, name, sub]) => {
          const active = value === v;
          return (
            <button
              key={v}
              onClick={() => onChange(v)}
              className={[
                "px-3 py-3 text-left border-2 transition-colors",
                active
                  ? "border-ink bg-paper2"
                  : "border-rule bg-paper hover:border-ink"
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                <span
                  className={[
                    "inline-block w-3 h-3 rounded-full border",
                    active ? "border-ink bg-ink" : "border-rule bg-paper"
                  ].join(" ")}
                />
                <span
                  className={[
                    "font-serif text-[16px]",
                    active ? "text-ink font-medium" : "text-ink2"
                  ].join(" ")}
                >
                  {name}
                </span>
              </div>
              <div className="font-mono text-[10px] text-ink3 mt-1 ml-5">
                {sub}
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
