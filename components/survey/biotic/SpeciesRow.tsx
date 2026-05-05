"use client";

import Stepper from "@/components/ui/Stepper";
import ToleranceLabel from "./ToleranceLabel";
import SpeciesIcon from "@/components/species/SpeciesIcon";
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
      <div className="w-10 h-10 shrink-0 flex items-center justify-center text-ink2">
        <SpeciesIcon id={id} className="w-full h-full" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-serif text-[15px] text-ink leading-tight">{name}</div>
        <ToleranceLabel tol={tol} />
      </div>
      <Stepper count={count} onChange={onStep} />
    </div>
  );
}
