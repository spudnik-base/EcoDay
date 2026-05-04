"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Disclosure from "@/components/ui/Disclosure";

export default function AboutFieldDay() {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center"
      >
        <span className="text-[10px] font-mono uppercase tracking-spec text-ink3">
          About this field day
        </span>
        <span className="text-[10px] font-mono text-ink4">
          {open ? "hide" : "show"}
        </span>
      </button>

      {open && (
        <div className="mt-3 space-y-2">
          <p className="font-serif text-[14px] text-ink leading-relaxed">
            Today&apos;s fieldwork answers six questions:
          </p>
          <ol className="font-serif text-[13px] text-ink leading-relaxed list-decimal pl-5 space-y-0.5">
            <li>Why study the environment?</li>
            <li>How do scientists collect data in the environment?</li>
            <li>What is an environmental impact assessment?</li>
            <li>How do we measure biodiversity?</li>
            <li>What are biological indicators?</li>
            <li>What are human impacts on the environment?</li>
          </ol>

          <Disclosure label="why study the environment?">
            <p className="font-serif text-[13px] text-ink leading-relaxed">
              Healthy ecosystems regulate water, soil, climate and food. They
              are the life-support system we live inside. Studying them gives
              us a baseline. Without baselines we can&apos;t tell whether the
              changes we see are recovery, decline, or natural variation.
              Today&apos;s readings join a multi-year dataset for this stream
              and meadow.
            </p>
          </Disclosure>

          <Disclosure label="what is an environmental impact assessment?">
            <p className="font-serif text-[13px] text-ink leading-relaxed">
              An EIA is a structured study predicting how a proposed activity
              (a new road, a building, an agricultural change) will affect
              the local ecosystem. It establishes a baseline before the
              activity, identifies what might be lost or changed, and
              suggests mitigations.
            </p>
            <p className="font-serif text-[13px] text-ink leading-relaxed mt-2">
              The data you collect today is exactly the kind of baseline an
              EIA relies on: abiotic factors, biotic indicators, biodiversity
              indices. Multiplied across many sites and years, it lets
              scientists tell change from noise.
            </p>
          </Disclosure>

          <Disclosure label="how does today contribute?">
            <p className="font-serif text-[13px] text-ink leading-relaxed">
              Each submission is a row in a Google Sheet that the class can
              compare and the school can keep year over year. GPS coordinates
              also let your readings feed into citizen-science archives like
              ArcGIS Survey123 where any researcher can pull the data.
            </p>
          </Disclosure>
        </div>
      )}
    </Card>
  );
}
