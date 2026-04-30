"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import HabitatPick from "./chi/HabitatPick";
import SpeciesPick from "./chi/SpeciesPick";
import Hypotheses from "./chi/Hypotheses";
import ObservedTable from "./chi/ObservedTable";
import ExpectedRow from "./chi/ExpectedRow";
import CalcTable from "./chi/CalcTable";
import Conclusion from "./chi/Conclusion";
import { chiSquared, speciesOptions, type Habitat } from "@/lib/chiSquared";
import { useClassData } from "@/lib/useClassData";

export default function ChiSquaredTab() {
  const [habitat, setHabitat] = useState<Habitat>("stream");
  const [speciesId, setSpeciesId] = useState<string>("");
  const { rows, status, refresh } = useClassData(false);

  const speciesLabel =
    speciesOptions(habitat).find((o) => o.id === speciesId)?.label ?? "the species";

  const habitatHint =
    habitat === "stream"
      ? "Counts are summed across all class submissions for each flow type."
      : "Percent cover is converted to quadrat-square count (each square = 4%) and summed across submissions.";

  return (
    <div className="pb-20 space-y-2">
      <Card>
        <p className="font-serif text-[14px] text-ink leading-relaxed">
          Chi-squared (&chi;&sup2;) tests whether your observed data fits an
          expected pattern. Goodness-of-fit, df = 1.
        </p>
        <div className="mt-2 flex justify-between items-center">
          <span className="font-mono text-[10px] text-ink3">
            using {rows.length} class submission{rows.length === 1 ? "" : "s"}
          </span>
          <button
            onClick={refresh}
            className="font-mono uppercase tracking-spec text-[10px] px-2 py-1 border border-rule"
            disabled={status === "loading"}
          >
            {status === "loading" ? "loading..." : "reload class data"}
          </button>
        </div>
      </Card>

      <HabitatPick value={habitat} onChange={(h) => { setHabitat(h); setSpeciesId(""); }} />
      <SpeciesPick habitat={habitat} value={speciesId} onChange={setSpeciesId} />

      {speciesId && (() => {
        const result = chiSquared(rows, { habitat, speciesId });
        if (result.kind === "needData") {
          return (
            <Card>
              <p className="font-serif text-[14px] text-ink leading-relaxed">
                Cannot calculate yet: {result.reason}.
              </p>
              <p className="font-mono text-[11px] text-ink3 mt-2">
                {result.labelA}: {result.nA} submissions. {result.labelB}: {result.nB} submissions.
              </p>
            </Card>
          );
        }
        return (
          <>
            <Hypotheses
              speciesLabel={speciesLabel}
              labelA={result.labelA}
              labelB={result.labelB}
            />
            <ObservedTable
              labelA={result.labelA}
              labelB={result.labelB}
              oA={result.oA}
              oB={result.oB}
              nA={result.nA}
              nB={result.nB}
              habitatHint={habitatHint}
            />
            <ExpectedRow
              oA={result.oA}
              oB={result.oB}
              eA={result.eA}
              eB={result.eB}
              labelA={result.labelA}
              labelB={result.labelB}
            />
            <CalcTable
              oA={result.oA}
              oB={result.oB}
              eA={result.eA}
              eB={result.eB}
              chi={result.chi}
              labelA={result.labelA}
              labelB={result.labelB}
            />
            <Conclusion
              chi={result.chi}
              reject={result.reject}
              warnLowExpected={result.warnLowExpected}
              speciesLabel={speciesLabel}
              labelA={result.labelA}
              labelB={result.labelB}
            />
          </>
        );
      })()}
    </div>
  );
}
