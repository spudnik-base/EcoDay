"use client";

import Link from "next/link";
import Header from "@/components/shared/Header";
import TopNav from "@/components/shared/TopNav";
import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import { CONFIG } from "@/lib/config";

export default function DashboardLandingPage() {
  return (
    <main className="max-w-[920px] mx-auto px-4 pb-16 pt-4">
      <TopNav current={undefined} />
      <Header
        eyebrow="Class dashboard"
        title={`Stream and meadow ${CONFIG.YEAR}`}
        subtitle="Pick a dataset to view"
        wide
      />
      <div className="bg-paper border border-rule border-t-0 px-4 pt-4 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/dashboard/stream"
            className="block bg-paper border border-ink2 hover:border-ink p-5 transition-colors"
          >
            <SpecLabel>River</SpecLabel>
            <div className="font-serif text-[24px] text-ink leading-tight mt-1">
              Stream dashboard
            </div>
            <p className="font-mono text-[11px] text-ink3 mt-2 leading-relaxed">
              Biotic index per site, abiotic class averages, pool vs riffle,
              altitude vs BI, all stream submissions.
            </p>
          </Link>
          <Link
            href="/dashboard/meadow"
            className="block bg-paper border border-ink2 hover:border-ink p-5 transition-colors"
          >
            <SpecLabel>Field</SpecLabel>
            <div className="font-serif text-[24px] text-ink leading-tight mt-1">
              Meadow dashboard
            </div>
            <p className="font-mono text-[11px] text-ink3 mt-2 leading-relaxed">
              Marsh vs drained Simpson&apos;s D, per-species cover, all meadow
              submissions.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
