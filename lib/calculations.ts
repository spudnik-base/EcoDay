import { SPECIES } from "./constants";
import type { Quality } from "./types";

export function mean(readings: readonly string[]): number | null {
  const ns = readings
    .map((v) => Number(v))
    .filter((n, i) => String(readings[i]) !== "" && !Number.isNaN(n));
  if (!ns.length) return null;
  return ns.reduce((a, b) => a + b, 0) / ns.length;
}

export function stdDev(readings: readonly string[]): number | null {
  const ns = readings
    .map((v) => Number(v))
    .filter((n, i) => String(readings[i]) !== "" && !Number.isNaN(n));
  if (ns.length < 2) return null;
  const m = ns.reduce((a, b) => a + b, 0) / ns.length;
  return Math.sqrt(
    ns.reduce((a, b) => a + (b - m) ** 2, 0) / (ns.length - 1)
  );
}

export function bioticIndex(
  counts: Record<string, number>
): number | null {
  let s = 0;
  let N = 0;
  for (const sp of SPECIES) {
    const c = counts[sp.id] || 0;
    s += c * sp.tol;
    N += c;
  }
  return N ? s / N : null;
}

export function simpsonsD(values: readonly (string | number)[]): number | null {
  const ns = values
    .map((v) => parseFloat(String(v)) || 0)
    .filter((n) => n > 0);
  const N = ns.reduce((a, b) => a + b, 0);
  if (N <= 1 || ns.length < 2) return null;
  return 1 - ns.reduce((a, n) => a + n * (n - 1), 0) / (N * (N - 1));
}

export function fmt(v: number | null | undefined, d = 2): string {
  return v != null && !Number.isNaN(v) ? Number(v).toFixed(d) : "";
}

export function qualityOf(bi: number | null): Quality | null {
  if (bi === null) return null;
  if (bi > 10)
    return {
      txt: "Good. Clean stream",
      bg: "#E4EAD2",
      fg: "#3C5518",
      border: "#9DB272"
    };
  if (bi >= 3)
    return {
      txt: "Average. Some pollution",
      bg: "#F5EBC8",
      fg: "#7A5500",
      border: "#C9A94A"
    };
  return {
    txt: "Poor. Gross pollution",
    bg: "#F1DCD2",
    fg: "#7A2A12",
    border: "#C57A5C"
  };
}

export function tolColor(t: number): { bg: string; fg: string; border: string } {
  if (t >= 10) return { bg: "#DEEAE3", fg: "#21503F", border: "#7FB29A" };
  if (t >= 8)  return { bg: "#DCE3EE", fg: "#1C2A48", border: "#7E92B7" };
  if (t >= 6)  return { bg: "#F0E3CB", fg: "#6C4A0E", border: "#C49B4A" };
  return         { bg: "#F1DCD2", fg: "#7A2A12", border: "#C57A5C" };
}
