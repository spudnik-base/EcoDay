import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import { SPECIES } from "@/lib/constants";
import type { SurveyState } from "@/lib/types";

type Props = { bio: SurveyState["bio"] };

export default function SpeciesFoundList({ bio }: Props) {
  const found = SPECIES.filter((s) => (bio[s.id] || 0) > 0);
  if (!found.length) return null;
  return (
    <Card>
      <SpecLabel>Species found</SpecLabel>
      <ul>
        {found.map((s) => (
          <li
            key={s.id}
            className="flex justify-between py-1 border-b border-rule/50 last:border-b-0 text-[13px]"
          >
            <span className="font-serif text-ink">{s.name}</span>
            <span className="font-mono text-teal">n = {bio[s.id]}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
