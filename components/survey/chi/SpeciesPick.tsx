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
          className="w-full h-11 px-2 font-mono text-[12px] bg-paper2/30 border-[0.5px] border-rule focus:border-ink appearance-none"
        >
          <option value="">choose...</option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </Card>
  );
}
