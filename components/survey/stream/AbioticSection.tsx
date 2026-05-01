"use client";

import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import Disclosure from "@/components/ui/Disclosure";
import AbioticCard from "../abiotic/AbioticCard";
import AbioticSdExplainer from "./AbioticSdExplainer";
import { ABIOTIC_FIELDS } from "@/lib/constants";
import type { UseSurveyState } from "@/lib/useSurveyState";

type Props = { survey: UseSurveyState };

export default function AbioticSection({ survey }: Props) {
  const { state, setAbiotic } = survey;
  return (
    <div>
      <Card>
        <SpecLabel>Three readings per factor</SpecLabel>
        <p className="font-serif text-[13px] text-ink leading-relaxed">
          For each abiotic factor, take three readings. Mean (x&#772;) and
          standard deviation (&plusmn;) update live as you type.
        </p>
        <Disclosure label="why three readings?">
          <p className="font-serif text-[13px] text-ink leading-relaxed">
            One reading might be a fluke (an air bubble, a stuck probe, a
            misread). Three readings let you compute a mean (which smooths
            random error) and an SD (which tells you how reproducible your
            measurement is). If your three readings disagree a lot, take three
            more.
          </p>
        </Disclosure>
        <Disclosure label="what do x&#772; and SD mean?">
          <AbioticSdExplainer ab={state.ab} />
        </Disclosure>
      </Card>
      {ABIOTIC_FIELDS.map((f) => (
        <AbioticCard
          key={f.key}
          factor={f}
          values={state.ab[f.key]}
          onChange={(i, v) => setAbiotic(f.key, i, v)}
        />
      ))}
    </div>
  );
}
