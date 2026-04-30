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
                "px-3 py-3 text-left border-[0.5px]",
                active
                  ? "border-ink bg-paper2/40"
                  : "border-rule bg-paper hover:border-ink"
              ].join(" ")}
            >
              <div className="font-serif text-[16px] text-ink">{name}</div>
              <div className="font-mono text-[10px] text-ink3 mt-0.5">{sub}</div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
