"use client";

import type { FetchStatus } from "@/lib/useClassData";

type Props = {
  count: number;
  status: FetchStatus;
  fetchedAt: Date | null;
  countdown: number;
  onRefresh: () => void;
};

function timeOf(d: Date): string {
  const h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function StatusBar({
  count,
  status,
  fetchedAt,
  countdown,
  onRefresh
}: Props) {
  let main: React.ReactNode;
  if (status === "loading" && !fetchedAt) main = <span className="text-ink4">Loading...</span>;
  else if (status === "error") main = <span className="text-sepia">Could not load. Check webhook.</span>;
  else if (fetchedAt) {
    main = (
      <>
        <strong className="text-ink">{count}</strong>
        <span className="text-ink3"> submission{count === 1 ? "" : "s"}, last updated {timeOf(fetchedAt)}</span>
      </>
    );
  } else main = <span className="text-ink4">Loading...</span>;

  return (
    <div className="flex items-center justify-between py-3">
      <div className="font-mono text-[11px]">
        {main}
        {fetchedAt && status !== "loading" && (
          <span className="text-ink4 ml-2">refresh in {countdown}s</span>
        )}
      </div>
      <button
        onClick={onRefresh}
        className="font-mono uppercase tracking-spec text-[10px] px-3 py-1.5 border-[0.5px] border-rule bg-paper hover:border-ink"
      >
        Refresh
      </button>
    </div>
  );
}
