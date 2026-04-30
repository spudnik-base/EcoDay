"use client";

import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";

type Props = {
  value: "marsh" | "drained";
  onChange: (v: "marsh" | "drained") => void;
};

const OPTIONS: ReadonlyArray<["marsh" | "drained", string]> = [
  ["marsh", "Marsh (ungrazed)"],
  ["drained", "Drained (grazed)"]
];

export default function MeadowSiteToggle({ value, onChange }: Props) {
  return (
    <Card>
      <SpecLabel>Site type</SpecLabel>
      <div className="flex gap-2">
        {OPTIONS.map(([v, label]) => {
          const active = value === v;
          return (
            <button
              key={v}
              onClick={() => onChange(v)}
              className={[
                "flex-1 h-11 px-2 font-mono text-[11px] uppercase tracking-spec border-[0.5px]",
                active
                  ? "bg-moss2 text-moss border-moss"
                  : "border-rule text-ink3 bg-paper2/30 hover:text-ink"
              ].join(" ")}
            >
              {label}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
