"use client";

import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import Disclosure from "@/components/ui/Disclosure";
import GroupGrid from "../site/GroupGrid";
import MeadowSiteToggle from "./MeadowSiteToggle";
import CoverInput from "./CoverInput";
import { MEADOW_LABELS } from "@/lib/constants";
import type { UseSurveyState } from "@/lib/useSurveyState";

type Props = { survey: UseSurveyState };

export default function SurveySection({ survey }: Props) {
  const { state, update, setMeadowSite, setMeadowCover } = survey;
  return (
    <div>
      <GroupGrid current={state.group} onPick={(v) => update({ group: v })} />
      <MeadowSiteToggle value={state.mdw.site} onChange={setMeadowSite} />
      <Card>
        <SpecLabel>Quadrat method</SpecLabel>
        <p className="font-serif text-[13px] text-ink leading-relaxed">
          Estimate the % cover of each species in your 25-square quadrat.
          Each square = 4%.
        </p>
        <Disclosure label="why % cover, not count?">
          <p className="font-serif text-[13px] text-ink leading-relaxed">
            Plants don&apos;t come in discrete units the way animals do. Grass
            spreads, dandelions form clones, moss carpets. Counting individual
            plants is impractical and often impossible. % cover measures the
            area of ground each species occupies, which is a much better proxy
            for how much that species contributes to the meadow.
          </p>
        </Disclosure>
      </Card>
      <div className="grid grid-cols-2 gap-1.5">
        {MEADOW_LABELS.map((l) => (
          <CoverInput
            key={l}
            letter={l}
            value={state.mdw.cover[l] ?? ""}
            onChange={(v) => setMeadowCover(l, v)}
          />
        ))}
      </div>
    </div>
  );
}
