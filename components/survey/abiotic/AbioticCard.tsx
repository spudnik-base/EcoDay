"use client";

import Card from "@/components/ui/Card";
import Field from "@/components/ui/Field";
import { fmt, mean, stdDev } from "@/lib/calculations";
import type { AbioticKey } from "@/lib/constants";

type Props = {
  factor: { key: AbioticKey; label: string; unit: string };
  values: [string, string, string];
  onChange: (i: 0 | 1 | 2, v: string) => void;
};

export default function AbioticCard({ factor, values, onChange }: Props) {
  const m = mean(values);
  const s = stdDev(values);
  return (
    <Card>
      <div className="flex justify-between items-baseline mb-2">
        <div className="font-serif text-[16px] text-ink">
          {factor.label}
          {factor.unit && (
            <span className="font-mono text-[11px] text-ink3 ml-1">
              ({factor.unit})
            </span>
          )}
        </div>
        <div className="flex gap-3 font-mono text-[11px]">
          {m !== null && <span className="text-teal">x&#772; {fmt(m)}</span>}
          {s !== null && <span className="text-ink4">&plusmn; {fmt(s)}</span>}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {([0, 1, 2] as const).map((i) => (
          <Field
            key={i}
            value={values[i]}
            onChange={(v) => onChange(i, v)}
            placeholder={`#${i + 1}`}
          />
        ))}
      </div>
    </Card>
  );
}
