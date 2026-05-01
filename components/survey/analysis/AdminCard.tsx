"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { CONFIG } from "@/lib/config";
import type { UseSurveyState } from "@/lib/useSurveyState";

type Props = { survey: UseSurveyState };

export default function AdminCard({ survey }: Props) {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);

  function handleReset() {
    if (confirming) {
      survey.reset();
      setConfirming(false);
    } else {
      setConfirming(true);
      window.setTimeout(() => setConfirming(false), 4000);
    }
  }

  return (
    <Card>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center"
      >
        <span className="text-[10px] font-mono uppercase tracking-spec text-ink3">
          Admin
        </span>
        <span className="text-[10px] font-mono text-ink4">
          {open ? "hide" : "show"}
        </span>
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          <div>
            <div className="text-[10px] font-mono text-ink3 mb-1">
              Stream Sheet
            </div>
            <div className="text-[10px] font-mono text-ink2 break-all bg-paper2/40 p-2 border border-rule">
              {CONFIG.WEBHOOK_URL_STREAM}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-ink3 mb-1">
              Meadow Sheet
            </div>
            <div className="text-[10px] font-mono text-ink2 break-all bg-paper2/40 p-2 border border-rule">
              {CONFIG.WEBHOOK_URL_MEADOW}
            </div>
          </div>
          <div className="text-[10px] font-mono text-ink4 leading-relaxed">
            To change for a new cohort, edit lib/config.ts and redeploy.
          </div>

          <div className="border-t border-rule pt-3">
            <div className="text-[10px] font-mono uppercase tracking-spec text-ink3 mb-2">
              Reset everything
            </div>
            <p className="font-mono text-[10px] text-ink3 leading-relaxed mb-2">
              Wipes all data on this device, both stream and meadow. Use this
              only when handing the device to a fresh group at the start of a
              new cohort.
            </p>
            <button
              onClick={handleReset}
              className={[
                "w-full h-11 px-3 font-mono uppercase tracking-spec text-[11px] font-medium border transition-colors",
                confirming
                  ? "border-sepia bg-[#FBEEE6] text-sepia"
                  : "border-rule text-sepia bg-paper hover:border-sepia"
              ].join(" ")}
            >
              {confirming ? "Tap again to confirm" : "Reset everything"}
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
