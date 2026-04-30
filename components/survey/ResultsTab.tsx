"use client";

import StatBox from "@/components/ui/StatBox";
import BioticIndexCard from "./results/BioticIndexCard";
import AbioticSummaryTable from "./results/AbioticSummaryTable";
import SpeciesFoundList from "./results/SpeciesFoundList";
import ExportButton from "./results/ExportButton";
import SubmitButton from "./results/SubmitButton";
import { MEADOW_LABELS, SPECIES } from "@/lib/constants";
import { bioticIndex, fmt, simpsonsD } from "@/lib/calculations";
import type { UseSurveyState } from "@/lib/useSurveyState";

type Props = { survey: UseSurveyState };

export default function ResultsTab({ survey }: Props) {
  const { state } = survey;
  const bi = bioticIndex(state.bio);
  const dStream = simpsonsD(SPECIES.map((s) => state.bio[s.id]));
  const dMeadow = simpsonsD(MEADOW_LABELS.map((l) => state.mdw.cover[l] ?? ""));
  const showSensors = state.gps.alt || state.gps.lux != null;

  return (
    <div className="pb-20 space-y-2">
      <BioticIndexCard bi={bi} site={state.site} flow={state.flow} />
      <div className="grid grid-cols-2 gap-2">
        <StatBox label="Simpson's D, stream" value={fmt(dStream, 3)} />
        <StatBox label="Simpson's D, meadow" value={fmt(dMeadow, 3)} />
      </div>
      {showSensors && (
        <div className="grid grid-cols-2 gap-2">
          {state.gps.alt && (
            <StatBox label="Altitude" value={state.gps.alt} unit="m" />
          )}
          {state.gps.lux != null && (
            <StatBox label="Light" value={String(state.gps.lux)} unit="lux" />
          )}
        </div>
      )}
      <AbioticSummaryTable ab={state.ab} />
      <SpeciesFoundList bio={state.bio} />
      <div className="space-y-2 mt-3">
        <ExportButton state={state} />
        <SubmitButton state={state} />
      </div>
    </div>
  );
}
