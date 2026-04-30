import { fmt, qualityOf } from "@/lib/calculations";

type Props = { bi: number };

export default function BiPill({ bi }: Props) {
  const q = qualityOf(Number.isNaN(bi) ? null : bi);
  if (!q) return <span className="font-mono text-ink4">·</span>;
  return (
    <span
      className="inline-block font-mono text-[11px] px-1.5 py-0.5"
      style={{ background: q.bg, color: q.fg, border: `0.5px solid ${q.border}` }}
    >
      {fmt(bi, 1)}
    </span>
  );
}
