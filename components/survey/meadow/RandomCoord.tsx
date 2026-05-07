"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";

// Random pair of coordinates for placing a quadrat. Two tape measures
// are laid out at right angles, one along x and one along y. Students
// set the max value of each tape (lengths can differ if the plot isn't
// square) and roll a fresh pair. Decoupled from survey state so it
// never touches the submission.
export default function RandomCoord() {
  const [maxX, setMaxX] = useState("100");
  const [maxY, setMaxY] = useState("100");
  const [pair, setPair] = useState<{ x: number; y: number } | null>(null);

  function roll() {
    const xHi = parseFloat(maxX);
    const yHi = parseFloat(maxY);
    if (Number.isNaN(xHi) || Number.isNaN(yHi) || xHi <= 0 || yHi <= 0) return;
    const x = Math.round(Math.random() * xHi);
    const y = Math.round(Math.random() * yHi);
    setPair({ x, y });
  }

  return (
    <Card>
      <SpecLabel>Random coordinate</SpecLabel>
      <p className="font-mono text-[10px] text-ink3 leading-relaxed mb-2">
        Set the maximum value of each tape measure, then roll a pair to
        decide where the quadrat&apos;s top-left corner goes.
      </p>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-spec text-ink3">
            max x
          </span>
          <input
            type="number"
            value={maxX}
            onChange={(e) => setMaxX(e.target.value)}
            className="w-16 h-9 px-2 text-center text-[13px] border border-rule focus:border-ink"
            aria-label="Maximum x"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-spec text-ink3">
            max y
          </span>
          <input
            type="number"
            value={maxY}
            onChange={(e) => setMaxY(e.target.value)}
            className="w-16 h-9 px-2 text-center text-[13px] border border-rule focus:border-ink"
            aria-label="Maximum y"
          />
        </div>
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
