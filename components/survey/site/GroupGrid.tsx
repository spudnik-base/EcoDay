"use client";

import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import NumGrid from "@/components/ui/NumGrid";
import { CONFIG } from "@/lib/config";

type Props = { current: string; onPick: (v: string) => void };

export default function GroupGrid({ current, onPick }: Props) {
  const values = Array.from({ length: CONFIG.GROUP_COUNT }, (_, i) => i + 1);
  return (
    <Card>
      <SpecLabel>Group</SpecLabel>
      <NumGrid values={values} current={current} onPick={onPick} />
    </Card>
  );
}
