"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

export default function PoolRiffleContext() {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center"
      >
        <span className="text-[10px] font-mono uppercase tracking-spec text-ink3">
          Pool vs riffle, what to expect
        </span>
        <span className="text-[10px] font-mono text-ink4">
          {open ? "hide" : "show"}
        </span>
      </button>
      {open && (
        <div className="mt-3 space-y-2">
          <p className="font-serif text-[13px] text-ink leading-relaxed">
            Riffles and pools are different habitats, not better or worse
            versions of each other.
          </p>
          <p className="font-serif text-[13px] text-ink leading-relaxed">
            <span className="font-medium">Riffles</span>: shallow, fast,
            tumbling. Water folds in air which raises dissolved oxygen.
            Substrate is coarse, often gravel or stones. Filter-feeding
            macroinvertebrates dominate (mayflies, stoneflies, caddisflies).
          </p>
          <p className="font-serif text-[13px] text-ink leading-relaxed">
            <span className="font-medium">Pools</span>: deeper, slower,
            sometimes warmer. Lower dissolved oxygen. Sediment settles, so
            substrate is finer. Different community: detritus feeders, scuds,
            leeches, and species that can tolerate lower oxygen.
          </p>
          <p className="font-serif text-[13px] text-ink3 leading-relaxed">
            A different biotic index between pool and riffle is expected. The
            useful question is not &ldquo;which scored higher?&rdquo; but
            &ldquo;does our class data show the difference we predicted from
            the ecology?&rdquo;
          </p>
        </div>
      )}
    </Card>
  );
}
