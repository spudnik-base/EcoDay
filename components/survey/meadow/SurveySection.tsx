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
        <Disclosure label="how to take a random sample">
          <ol className="font-serif text-[13px] text-ink leading-relaxed list-decimal pl-5 space-y-1">
            <li>Agree as a class on species labels A, B, C... and photograph
              the reference card. Everyone uses the same letters.</li>
            <li>Lay out two 30 m tape measures at right angles to define a
              sampling grid.</li>
            <li>Generate a random pair of coordinates (e.g. roll dice or use
              a random-number app).</li>
            <li>Place the 1 x 1 m quadrat with its top-left corner at that
              coordinate. Don&apos;t move it once it&apos;s down.</li>
            <li>For each species, estimate % cover (each of the 25 quadrat
              squares = 4%). If unsure, count the squares the species
              occupies and multiply by 4.</li>
            <li>Repeat at multiple random coordinates if time allows; each
              quadrat is a separate submission to the meadow Sheet.</li>
          </ol>
        </Disclosure>
        <p className="font-mono text-[10px] text-ink3 leading-relaxed mt-2">
          Tip: <span className="font-medium text-ink2">Seek by iNaturalist</span>
          {" "}is a free phone app. Point the camera at a plant and it suggests
          a species. Useful when you&apos;re not sure what you&apos;re looking
          at.
        </p>
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
