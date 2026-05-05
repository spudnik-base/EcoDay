"use client";

import Stepper from "@/components/ui/Stepper";
import ToleranceLabel from "./ToleranceLabel";
import SpeciesPreview from "@/components/species/SpeciesPreview";
import type { SpeciesId } from "@/lib/constants";

type Props = {
  id: SpeciesId;
  name: string;
  tol: number;
  count: number;
  onStep: (delta: number) => void;
  isLast: boolean;
};

export default function SpeciesRow({
  id,
  name,
  tol,
  count,
  onStep,
  isLast
}: Props) {
  return (
    <div
      className={[
        "flex items-center gap-3 py-2.5",
        isLast ? "" : "border-b border-rule/60"
      ].join(" ")}
    >
      <SpeciesPreview id={id} />
      <div className="flex-1 min-w-0">
        <div className="font-serif text-[15px] text-ink leading-tight">{name}</div>
        <ToleranceLabel tol={tol} />
      </div>
      <Stepper count={count} onChange={onStep} />
    </div>
  );
}
