"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

export default function HypothesisPrimer() {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center"
      >
        <span className="text-[10px] font-mono uppercase tracking-spec text-ink3">
          What is a chi-squared test?
        </span>
        <span className="text-[10px] font-mono text-ink4">
          {open ? "hide" : "show"}
        </span>
      </button>
      {open && (
        <div className="mt-3 space-y-2">
          <p className="font-serif text-[13px] text-ink leading-relaxed">
            A statistical way to check whether a pattern in your data is real
            or just down to chance. We test two species&apos; co-occurrence here.
          </p>
          <p className="font-serif text-[13px] text-ink leading-relaxed">
            <span className="font-medium">H&#8320; (null hypothesis):</span>{" "}
            nothing&apos;s going on. The two species are independent. Any
            apparent association is a fluke of sampling.
          </p>
          <p className="font-serif text-[13px] text-ink leading-relaxed">
            <span className="font-medium">H&#8321; (alternative hypothesis):</span>{" "}
            the two species are associated, either positively (occur together)
            or negatively (avoid each other).
          </p>
          <p className="font-serif text-[13px] text-ink leading-relaxed">
            &chi;&sup2; compares your <em>observed</em> counts to the counts
            you would <em>expect</em> if H&#8320; were true. A big gap between
            observed and expected makes &chi;&sup2; large.
          </p>
          <p className="font-serif text-[13px] text-ink leading-relaxed">
            <span className="font-medium">
              Critical value at p = 0.05, df = 1 is 3.84.
            </span>{" "}
            If your &chi;&sup2; is bigger than 3.84, the pattern is unlikely
            under H&#8320;, so we reject it. The &ldquo;5%&rdquo; means we will
            be wrong about 1 in 20 times if H&#8320; is in fact true. That
            risk is the price of making a decision from data.
          </p>
        </div>
      )}
    </Card>
  );
}
