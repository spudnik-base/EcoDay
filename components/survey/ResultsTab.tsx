"use client";

import Card from "@/components/ui/Card";
import StatBox from "@/components/ui/StatBox";
import Disclosure from "@/components/ui/Disclosure";
import SpecLabel from "@/components/ui/SpecLabel";
import BioticIndexCard from "./results/BioticIndexCard";
import AbioticSummaryTable from "./results/AbioticSummaryTable";
import SpeciesFoundList from "./results/SpeciesFoundList";
import SimpsonCalcDetails from "./results/SimpsonCalcDetails";
import ExportButton from "./results/ExportButton";
import StreamSubmitSection from "./results/StreamSubmitSection";
import MeadowSubmitSection from "./results/MeadowSubmitSection";
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

  const streamRows = SPECIES.map((s) => ({
    name: s.name,
    n:    state.bio[s.id] || 0
  }));
  const meadowRows = MEADOW_LABELS.map((l) => ({
    name: `Species ${l}`,
    n:    Math.round((parseFloat(state.mdw.cover[l] ?? "0") || 0) / 4)
  }));

  return (
    <div className="pb-20 space-y-2">
      <BioticIndexCard bi={bi} site={state.site} flow={state.flow} bio={state.bio} />
      <div className="grid grid-cols-2 gap-2">
        <StatBox label="Simpson's D, stream" value={fmt(dStream, 3)} />
        <StatBox label="Simpson's D, meadow" value={fmt(dMeadow, 3)} />
      </div>
      <Card>
        <SpecLabel>Simpson&apos;s D</SpecLabel>
        <p className="font-mono text-[11px] text-ink3 leading-relaxed">
          D = 1 &minus; &Sigma;n(n &minus; 1) &divide; N(N &minus; 1).
          Higher value = more diverse. Range 0 to 1.
        </p>
        <Disclosure label="stream calculation">
          <SimpsonCalcDetails
            rows={streamRows}
            unitLabel="n"
            countNoun="organisms"
          />
        </Disclosure>
        <Disclosure label="meadow calculation">
          <SimpsonCalcDetails
            rows={meadowRows}
            unitLabel="n (squares)"
            countNoun="quadrat squares"
          />
        </Disclosure>
        <p className="font-mono text-[10px] text-ink4 mt-2 leading-relaxed">
          Meadow uses quadrat-square count: each square = 4% cover.
        </p>
      </Card>
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
      <div className="mt-3">
        <ExportButton state={state} />
      </div>
      <StreamSubmitSection state={state} onResetStream={survey.resetStream} />
      <MeadowSubmitSection state={state} onResetMeadow={survey.resetMeadow} />
    </div>
  );
}
