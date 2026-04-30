"use client";

import GroupGrid from "./site/GroupGrid";
import SiteGrid from "./site/SiteGrid";
import FlowToggle from "./site/FlowToggle";
import SensorsCard from "./site/SensorsCard";
import WebhookPanel from "./site/WebhookPanel";
import Button from "@/components/ui/Button";
import type { UseSurveyState } from "@/lib/useSurveyState";

type Props = { survey: UseSurveyState };

export default function SiteTab({ survey }: Props) {
  const { state, update, reset } = survey;
  return (
    <div className="pb-20">
      <GroupGrid current={state.group} onPick={(v) => update({ group: v })} />
      <SiteGrid current={state.site} onPick={(v) => update({ site: v })} />
      <FlowToggle value={state.flow} onChange={(v) => update({ flow: v })} />
      <SensorsCard survey={survey} />
      <WebhookPanel />
      <div className="mt-2">
        <Button variant="danger" onClick={reset}>
          Reset for new group
        </Button>
      </div>
    </div>
  );
}
