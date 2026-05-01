"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import { speciesOptions, type Habitat } from "@/lib/chiSquared";

type Props = {
  habitat: Habitat;
  value: string;
  onChange: (id: string) => void;
  step: string;
  title: string;
  excludeId?: string;
};

export default function SpeciesPick({
  habitat,
  value,
  onChange,
  step,
  title,
  excludeId
}: Props) {
  const options = speciesOptions(habitat);
  const cols = habitat === "meadow" ? "grid-cols-4" : "grid-cols-2";
  const [open, setOpen] = useState(false);

  const current = options.find((o) => o.id === value);

  function pick(id: string) {
    onChange(id);
    setOpen(false);
  }

  return (
    <Card>
      <SpecLabel>{`${step}. ${title}`}</SpecLabel>
      <button
        onClick={() => setOpen(!open)}
        className="w-full h-11 px-3 flex items-center justify-between border border-rule bg-paper hover:border-ink"
      >
        <span
          className={[
            "font-serif text-[14px]",
            current ? "text-ink" : "text-ink4"
          ].join(" ")}
        >
          {current ? current.label : "choose..."}
        </span>
        <span className="font-mono text-[14px] text-ink2">
          {open ? "▴" : "▾"}
        </span>
      </button>
      {open && (
        <div className="mt-2">
          <p className="font-mono text-[10px] text-ink3 leading-relaxed mb-2">
            Tap a species. Working updates straight away.
          </p>
          <div className={`grid ${cols} gap-1.5`}>
            {options.map((o) => {
              const active = value === o.id;
              const disabled = excludeId === o.id;
              return (
                <button
                  key={o.id}
                  onClick={() => !disabled && pick(o.id)}
                  disabled={disabled}
                  className={[
                    "px-2 py-2 text-left border transition-colors",
                    disabled
                      ? "border-rule bg-paper2/40 text-ink4 line-through cursor-not-allowed"
                      : active
                      ? "border-ink border-2 bg-paper2 text-ink"
                      : "border-rule bg-paper text-ink2 hover:border-ink"
                  ].join(" ")}
                >
                  <span
                    className={[
                      habitat === "meadow"
                        ? "font-serif text-[16px] block text-center"
                        : "font-serif text-[13px] leading-tight",
                      active ? "font-medium" : ""
                    ].join(" ")}
                  >
                    {o.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}
