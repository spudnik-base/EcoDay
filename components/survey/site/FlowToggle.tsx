"use client";

import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";

type Props = { value: "riffle" | "pool"; onChange: (v: "riffle" | "pool") => void };

export default function FlowToggle({ value, onChange }: Props) {
  return (
    <Card>
      <SpecLabel>Flow type</SpecLabel>
      <div className="flex gap-2">
        {(["riffle", "pool"] as const).map((t) => {
          const active = value === t;
          return (
            <button
              key={t}
              onClick={() => onChange(t)}
              className={[
                "flex-1 h-11 font-mono uppercase tracking-spec text-[11px] border-[0.5px]",
                active
                  ? "ink-stamp bg-paper text-ink"
                  : "border-rule text-ink3 bg-paper2/30 hover:text-ink"
              ].join(" ")}
            >
              {t}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
