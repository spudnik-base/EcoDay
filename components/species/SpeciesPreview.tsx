"use client";

import { useEffect, useState } from "react";
import SpeciesIcon from "./SpeciesIcon";
import { tolColor } from "@/lib/calculations";
import { SPECIES, type SpeciesId } from "@/lib/constants";

type Props = {
  id: SpeciesId;
};

const TOL_DESCRIPTION: Record<number, string> = {
  10: "Pollution-sensitive. Found only in clean, well-oxygenated water.",
  8:  "Moderately sensitive. Common in healthy streams.",
  6:  "Tolerates some pollution. Survives moderately disturbed water.",
  3:  "Pollution tolerant. Persists in low-oxygen polluted water.",
  2:  "Highly tolerant. Often dominant in heavily polluted sediment."
};

// A 40x40 icon button. Tap it and a modal preview shows the same icon
// at large scale plus the species name and tolerance band, centred over
// a dimmed backdrop. Tap backdrop, the X, or press Esc to dismiss.
export default function SpeciesPreview({ id }: Props) {
  const [open, setOpen] = useState(false);
  const sp = SPECIES.find((s) => s.id === id);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!sp) return null;
  const tc = tolColor(sp.tol);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={`Enlarge ${sp.name}`}
        className="w-10 h-10 shrink-0 flex items-center justify-center text-ink2 hover:text-ink"
      >
        <SpeciesIcon id={id} className="w-full h-full" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={sp.name}
        >
          <div
            className="bg-paper border-2 border-ink max-w-[360px] w-full p-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close preview"
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-ink2 hover:text-ink font-mono text-[18px]"
            >
              {"×"}
            </button>

            <div className="flex items-center justify-center w-[220px] h-[220px] mx-auto text-ink">
              <SpeciesIcon id={id} className="w-full h-full" />
            </div>

            <div className="mt-3 text-center">
              <h3 className="font-serif text-[22px] text-ink leading-tight">
                {sp.name}
              </h3>
              <span
                className="inline-block mt-2 font-mono text-[10px] uppercase tracking-spec px-2 py-1"
                style={{
                  background: tc.bg,
                  color: tc.fg,
                  border: `1px solid ${tc.border}`
                }}
              >
                tolerance {sp.tol}
              </span>
            </div>

            <p className="font-serif text-[13px] text-ink leading-relaxed mt-3 text-center">
              {TOL_DESCRIPTION[sp.tol]}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
