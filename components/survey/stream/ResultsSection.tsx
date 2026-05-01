"use client";

import Card from "@/components/ui/Card";
import StatBox from "@/components/ui/StatBox";
import Disclosure from "@/components/ui/Disclosure";
import SpecLabel from "@/components/ui/SpecLabel";
import BioticIndexCard from "../results/BioticIndexCard";
import AbioticSummaryTable from "../results/AbioticSummaryTable";
import SpeciesFoundList from "../results/SpeciesFoundList";
import SimpsonCalcDetails from "../results/SimpsonCalcDetails";
import ExportButton from "../results/ExportButton";
import StreamSubmitSection from "../results/StreamSubmitSection";
import QualityBandsExplainer from "./QualityBandsExplainer";
import SimpsonInterpretation from "../SimpsonInterpretation";
import { SPECIES } from "@/lib/constants";
import { bioticIndex, fmt, simpsonsD } from "@/lib/calculations";
import type { UseSurveyState } from "@/lib/useSurveyState";

type Props = { survey: UseSurveyState };

export default function ResultsSection({ survey }: Props) {
  const { state, resetStream } = survey;
  const bi = bioticIndex(state.bio);
  const dStream = simpsonsD(SPECIES.map((s) => state.bio[s.id]));
  const showSensors = state.gps.alt || state.gps.lux != null;
  const streamRows = SPECIES.map((s) => ({
    name: s.name,
    n:    state.bio[s.id] || 0
  }));

  return (
    <div className="space-y-2">
      <BioticIndexCard bi={bi} site={state.site} flow={state.flow} bio={state.bio} />
      <Card>
        <SpecLabel>What does the verdict mean?</SpecLabel>
        <Disclosure label="ecological story per band">
          <QualityBandsExplainer />
        </Disclosure>
      </Card>
      <Card>
        <SpecLabel>Simpson&apos;s D, stream</SpecLabel>
        <div className="font-serif text-[36px] leading-none text-ink">
          {fmt(dStream, 3) || "·"}
        </div>
        <p className="font-mono text-[10px] text-ink3 mt-2 leading-relaxed">
          D = 1 &minus; &Sigma;n(n &minus; 1) &divide; N(N &minus; 1).
        </p>
        <Disclosure label="show calculation">
          <SimpsonCalcDetails
            rows={streamRows}
            unitLabel="n"
            countNoun="organisms"
          />
        </Disclosure>
        <Disclosure label="how to interpret">
          <SimpsonInterpretation />
        </Disclosure>
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
      <StreamSubmitSection state={state} onResetStream={resetStream} />
    </div>
  );
}
