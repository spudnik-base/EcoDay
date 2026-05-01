"use client";

import { useRef, useState } from "react";
import Card from "@/components/ui/Card";
import HabitatPick from "./chi/HabitatPick";
import SpeciesPick from "./chi/SpeciesPick";
import Hypotheses from "./chi/Hypotheses";
import ObservedTable from "./chi/ObservedTable";
import ExpectedRow from "./chi/ExpectedRow";
import CalcTable from "./chi/CalcTable";
import Conclusion from "./chi/Conclusion";
import { chiSquared, type Habitat } from "@/lib/chiSquared";
import { CONFIG } from "@/lib/config";
import { useClassData } from "@/lib/useClassData";

export default function ChiSquaredTab() {
  const [habitat, setHabitat]   = useState<Habitat>("stream");
  const [speciesId1, setSp1]    = useState<string>("");
  const [speciesId2, setSp2]    = useState<string>("");
  const url = habitat === "stream"
    ? CONFIG.WEBHOOK_URL_STREAM
    : CONFIG.WEBHOOK_URL_MEADOW;
  const { rows, status, refresh } = useClassData(url, false);
  const sp1Ref = useRef<HTMLDivElement | null>(null);

  function resetForHabitat(h: Habitat) {
    setHabitat(h);
    setSp1("");
    setSp2("");
  }

  return (
    <div className="pb-20 space-y-2">
      <Card>
        <p className="font-serif text-[14px] text-ink leading-relaxed">
          Chi-squared (&chi;&sup2;) test of association: do two species occur
          together more (or less) than chance predicts? 2x2 contingency, df = 1.
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

      <HabitatPick value={habitat} onChange={resetForHabitat} />

      <div ref={sp1Ref}>
        <SpeciesPick
          habitat={habitat}
          value={speciesId1}
          onChange={setSp1}
          step="2"
          title="Pick the first species"
          excludeId={speciesId2}
        />
      </div>

      {speciesId1 && (
        <SpeciesPick
          habitat={habitat}
          value={speciesId2}
          onChange={setSp2}
          step="3"
          title="Pick a second species"
          excludeId={speciesId1}
        />
      )}

      {speciesId1 && speciesId2 && (() => {
        const result = chiSquared(rows, { habitat, speciesId1, speciesId2 });
        if (result.kind === "needData") {
          return (
            <Card>
              <p className="font-serif text-[14px] text-ink leading-relaxed">
                Cannot calculate yet: {result.reason}.
              </p>
              <p className="font-mono text-[11px] text-ink3 mt-2">
                {result.N} {result.labels.universe} so far.
              </p>
            </Card>
          );
        }
        const { labels } = result;
        return (
          <>
            <Hypotheses sp1={labels.sp1} sp2={labels.sp2} universe={labels.universe} />
            <ObservedTable
              sp1={labels.sp1}
              sp2={labels.sp2}
              universe={labels.universe}
              a={result.a} b={result.b} c={result.c} d={result.d}
              row1={result.row1} row2={result.row2}
              colA={result.colA} colB={result.colB}
              N={result.N}
            />
            <ExpectedRow
              sp1={labels.sp1} sp2={labels.sp2}
              row1={result.row1} row2={result.row2}
              colA={result.colA} colB={result.colB}
              N={result.N}
              ea={result.ea} eb={result.eb} ec={result.ec} ed={result.ed}
            />
            <CalcTable
              cells={[
                { label: `${labels.sp1} + ${labels.sp2} both present`, o: result.a, e: result.ea, c: result.ca },
                { label: `${labels.sp1} only (no ${labels.sp2})`,      o: result.b, e: result.eb, c: result.cb },
                { label: `${labels.sp2} only (no ${labels.sp1})`,      o: result.c, e: result.ec, c: result.cc },
                { label: `Both absent`,                                o: result.d, e: result.ed, c: result.cd }
              ]}
              chi={result.chi}
            />
            <Conclusion
              chi={result.chi}
              reject={result.reject}
              positive={result.positive}
              warnLowExpected={result.warnLowExpected}
              sp1={labels.sp1}
              sp2={labels.sp2}
            />
            <button
              onClick={() => {
                setSp1("");
                setSp2("");
                sp1Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="w-full h-11 px-3 mt-2 font-mono uppercase tracking-spec text-[11px] font-medium border border-ink bg-paper text-ink"
            >
              Try another pair
            </button>
          </>
        );
      })()}
    </div>
  );
}
