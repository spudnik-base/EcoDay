"use client";

import { useEffect, useRef, useState } from "react";
import { CONFIG } from "./config";

export type ClassRow = Record<string, string | number | null>;

export type FetchStatus = "idle" | "loading" | "ok" | "error";

export type UseClassData = {
  rows: ClassRow[];
  status: FetchStatus;
  fetchedAt: Date | null;
  countdown: number;
  refresh: () => void;
};

// Pass the URL of the Sheet you want to fetch. If you pass two distinct URLs
// (stream and meadow) and want them merged, fetch each separately and
// concatenate the rows in your component, or use useMergedClassData below.
export function useClassData(url: string, autoRefresh = true): UseClassData {
  const [rows, setRows] = useState<ClassRow[]>([]);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState<number>(CONFIG.REFRESH_SECS);
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  async function refresh() {
    setStatus("loading");
    try {
      const res = await fetch(url, { cache: "no-store" });
      const data = (await res.json()) as ClassRow[];
      setRows(Array.isArray(data) ? data : []);
      setFetchedAt(new Date());
      setStatus("ok");
    } catch {
      setStatus("error");
    } finally {
      if (autoRefresh) {
        setCountdown(CONFIG.REFRESH_SECS);
        if (refreshTimer.current) clearTimeout(refreshTimer.current);
        refreshTimer.current = setTimeout(refresh, CONFIG.REFRESH_SECS * 1000);
      }
    }
  }

  useEffect(() => {
    refresh();
    if (autoRefresh) {
      tickTimer.current = setInterval(
        () => setCountdown((c) => (c > 0 ? c - 1 : 0)),
        1000
      );
    }
    return () => {
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
      if (tickTimer.current) clearInterval(tickTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { rows, status, fetchedAt, countdown, refresh };
}
