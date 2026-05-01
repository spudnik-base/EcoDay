"use client";

import { useRef, useState } from "react";
import Card from "@/components/ui/Card";
import HabitatPick from "../chi/HabitatPick";
import SpeciesPick from "../chi/SpeciesPick";
import Hypotheses from "../chi/Hypotheses";
import ObservedTable from "../chi/ObservedTable";
import ExpectedRow from "../chi/ExpectedRow";
import CalcTable from "../chi/CalcTable";
import Conclusion from "../chi/Conclusion";
import HypothesisPrimer from "./HypothesisPrimer";
import PoolRiffleContext from "./PoolRiffleContext";
import { chiSquared, type Habitat } from "@/lib/chiSquared";
import type { ClassRow, FetchStatus } from "@/lib/useClassData";

type Props = {
  streamRows: ClassRow[];
  meadowRows: ClassRow[];
  status: FetchStatus;
  refresh: () => void;
};

export default function ChiSection({
  streamRows,
  meadowRows,
  status,
  refresh
}: Props) {
  const [habitat, setHabitat] = useState<Habitat>("stream");
  const [speciesId1, setSp1]  = useState<string>("");
  const [speciesId2, setSp2]  = useState<string>("");
  const sp1Ref = useRef<HTMLDivElement | null>(null);

  const rows = habitat === "stream" ? streamRows : meadowRows;

  function resetForHabitat(h: Habitat) {
    setHabitat(h);
    setSp1("");
    setSp2("");
  }

  return (
    <div className="space-y-2">
      <HypothesisPrimer />

      <Card>
        <p className="font-mono text-[10px] text-ink3">
          using {rows.length} {habitat} submission{rows.length === 1 ? "" : "s"}
        </p>
        <button
          onClick={refresh}
          className="mt-2 font-mono uppercase tracking-spec text-[10px] px-2 py-1 border border-rule"
          disabled={status === "loading"}
        >
          {status === "loading" ? "loading..." : "reload class data"}
        </button>
      </Card>

      <HabitatPick value={habitat} onChange={resetForHabitat} />

      {habitat === "stream" && <PoolRiffleContext />}

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
