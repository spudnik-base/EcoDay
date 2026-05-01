"use client";

import GroupGrid from "../site/GroupGrid";
import SiteGrid from "../site/SiteGrid";
import FlowToggle from "../site/FlowToggle";
import SensorsCard from "../site/SensorsCard";
import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import Disclosure from "@/components/ui/Disclosure";
import type { UseSurveyState } from "@/lib/useSurveyState";

type Props = { survey: UseSurveyState };

export default function SetupSection({ survey }: Props) {
  const { state, update } = survey;
  return (
    <div>
      <GroupGrid current={state.group} onPick={(v) => update({ group: v })} />
      <SiteGrid current={state.site} onPick={(v) => update({ site: v })} />
      <FlowToggle value={state.flow} onChange={(v) => update({ flow: v })} />
      <SensorsCard survey={survey} />
      <Card>
        <SpecLabel>Why GPS?</SpecLabel>
        <p className="font-serif text-[13px] text-ink leading-relaxed">
          Your location and altitude are saved with each submission so the data
          can be plotted on a map.
        </p>
        <Disclosure label="more on citizen science">
          <p className="font-serif text-[13px] text-ink leading-relaxed">
            Recordings like yours feed into open citizen-science archives such
            as ArcGIS Survey123. Researchers use the same datasets to track
            ecological change over years and decades. Your fieldwork is real
            data, not a classroom exercise.
          </p>
        </Disclosure>
      </Card>
    </div>
  );
}
