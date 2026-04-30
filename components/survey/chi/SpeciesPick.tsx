"use client";

import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import { speciesOptions, type Habitat } from "@/lib/chiSquared";

type Props = {
  habitat: Habitat;
  value: string;
  onChange: (id: string) => void;
};

export default function SpeciesPick({ habitat, value, onChange }: Props) {
  const options = speciesOptions(habitat);
  return (
    <Card>
      <SpecLabel>2. Pick a species</SpecLabel>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 pl-3 pr-10 font-mono text-[12px] text-ink bg-paper border border-rule focus:border-ink appearance-none cursor-pointer"
        >
          <option value="">choose...</option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink2 font-mono text-[14px]"
        >
          ▾
        </span>
      </div>
      {value && (
        <p className="font-mono text-[10px] text-ink3 mt-2 leading-relaxed">
          Tap the box above to change to another species. Working updates live.
        </p>
      )}
    </Card>
  );
}
