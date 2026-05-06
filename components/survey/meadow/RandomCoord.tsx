"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";

// Random pair of coordinates for placing a quadrat. Students set the
// range to match their tape-measure length (default 0-100). 'Roll'
// gives a fresh pair. Decoupled from survey state so it never touches
// the submission.
export default function RandomCoord() {
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("100");
  const [pair, setPair] = useState<{ x: number; y: number } | null>(null);

  function roll() {
    const lo = parseFloat(min);
    const hi = parseFloat(max);
    if (Number.isNaN(lo) || Number.isNaN(hi) || hi <= lo) return;
    const x = Math.round(lo + Math.random() * (hi - lo));
    const y = Math.round(lo + Math.random() * (hi - lo));
    setPair({ x, y });
  }

  return (
    <Card>
      <SpecLabel>Random coordinate</SpecLabel>
      <p className="font-mono text-[10px] text-ink3 leading-relaxed mb-2">
        Set the range to match your tape measure length, then roll a pair to
        decide where the quadrat&apos;s top-left corner goes.
      </p>
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[10px] uppercase tracking-spec text-ink3">
          Range
        </span>
        <input
          type="number"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          className="w-16 h-9 px-2 text-center text-[13px] border border-rule focus:border-ink"
          aria-label="Minimum"
        />
        <span className="font-mono text-[10px] text-ink3">to</span>
        <input
          type="number"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          className="w-16 h-9 px-2 text-center text-[13px] border border-rule focus:border-ink"
          aria-label="Maximum"
        />
      </div>
      {pair && (
        <div className="flex items-baseline gap-4 bg-paper2/40 border border-rule px-3 py-2 mb-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-spec text-ink3">
              x
            </span>
            <span className="font-serif text-[26px] leading-none text-ink">
              {pair.x}
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-spec text-ink3">
              y
            </span>
            <span className="font-serif text-[26px] leading-none text-ink">
              {pair.y}
            </span>
          </div>
        </div>
      )}
      <button
        onClick={roll}
        className="w-full h-10 px-3 font-mono uppercase tracking-spec text-[11px] font-medium border-2 border-ink bg-paper text-ink hover:bg-paper2"
      >
        {pair ? "Roll new pair" : "Roll a pair"}
      </button>
    </Card>
  );
}
