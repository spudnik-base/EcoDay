"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { CONFIG } from "@/lib/config";

export default function WebhookPanel() {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center"
      >
        <span className="text-[10px] font-mono uppercase tracking-spec text-ink3">
          Submission target
        </span>
        <span className="text-[10px] font-mono text-ink4">
          {open ? "hide" : "show"}
        </span>
      </button>
      {open && (
        <div className="mt-2.5">
          <div className="text-[10px] font-mono text-ink3 mb-1">
            Google Sheets webhook (set in code)
          </div>
          <div className="text-[10px] font-mono text-ink2 break-all bg-paper2/40 p-2 border-[0.5px] border-rule">
            {CONFIG.WEBHOOK_URL}
          </div>
          <div className="text-[10px] font-mono text-ink4 mt-1.5 leading-relaxed">
            To change for a new cohort, edit lib/config.ts and redeploy.
          </div>
        </div>
      )}
    </Card>
  );
}
