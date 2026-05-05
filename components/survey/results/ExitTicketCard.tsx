"use client";

import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import Disclosure from "@/components/ui/Disclosure";
import { CONFIG } from "@/lib/config";

type Props = { habitat: "stream" | "meadow" };

export default function ExitTicketCard({ habitat }: Props) {
  const url =
    habitat === "stream"
      ? CONFIG.EXIT_TICKET_STREAM_URL
      : CONFIG.EXIT_TICKET_MEADOW_URL;

  return (
    <Card className="border-2 border-ink">
      <SpecLabel>Exit ticket</SpecLabel>
      <p className="font-serif text-[14px] text-ink leading-relaxed">
        Now you&apos;ve seen your numbers, take ten minutes to reflect with a
        few short questions.
      </p>

      {habitat === "stream" ? (
        <Disclosure label="context, before you answer">
          <div className="space-y-2">
            <p className="font-serif text-[13px] text-ink leading-relaxed">
              Plants and algae build DNA, RNA, and proteins from{" "}
              <span className="font-mono">CHON + P</span>. Carbon, hydrogen and
              oxygen come from water and air, but{" "}
              <span className="font-medium">nitrogen and phosphorus are
              limiting</span> in most freshwater systems. Add nitrate via
              fertiliser run-off or animal waste leaching off pasture, and
              algae explode.
            </p>
            <p className="font-serif text-[13px] text-ink leading-relaxed">
              When that biomass dies, bacteria break it down and use up
              dissolved oxygen.{" "}
              <span className="font-medium">Biological Oxygen Demand (BOD)</span>{" "}
              shoots up, dissolved oxygen drops, fish suffocate, and the food
              web collapses. This is{" "}
              <span className="font-medium">eutrophication</span>.
            </p>
            <p className="font-serif text-[13px] text-ink leading-relaxed">
              We measured nitrate directly. Macroinvertebrate diversity is the
              integrated long-term consequence: high-tolerance species like
              segmented worm survive low-oxygen water; low-tolerance species
              like stonefly nymph do not. Your biotic index is a slow but
              honest measure of eutrophication risk.
            </p>
          </div>
        </Disclosure>
      ) : (
        <Disclosure label="context, before you answer">
          <div className="space-y-2">
            <p className="font-serif text-[13px] text-ink leading-relaxed">
              The two meadow types are an experiment in land use. Marsh is wet,
              undisturbed by livestock, with rich vertical structure. Drained
              meadow is grazed and trampled, soil compacted, drier.
            </p>
            <p className="font-serif text-[13px] text-ink leading-relaxed">
              Grazing has three effects on plant diversity:{" "}
              <span className="font-medium">selective pressure</span>{" "}
              (palatable species are eaten, unpalatable ones spread),{" "}
              <span className="font-medium">trampling</span> (compaction
              reduces seed germination and root oxygen), and{" "}
              <span className="font-medium">drainage</span> (removes the wet
              microhabitats specialist wetland plants need).
            </p>
            <p className="font-serif text-[13px] text-ink leading-relaxed">
              Your Simpson&apos;s D for marsh vs drained is one local
              snapshot of how farming pressure changes biodiversity.
            </p>
          </div>
        </Disclosure>
      )}

      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mt-3 h-11 px-3 font-mono uppercase tracking-spec text-[11px] font-medium border-2 border-ink bg-paper text-ink text-center leading-[2.4]"
        >
          Open exit ticket &rarr;
        </a>
      ) : (
        <p className="font-mono text-[10px] text-ink4 leading-relaxed mt-3">
          Exit ticket link will appear once your teacher sets up the form.
        </p>
      )}
    </Card>
  );
}
