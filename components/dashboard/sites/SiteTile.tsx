import { fmt, qualityOf } from "@/lib/calculations";
import type { ParsedRow } from "@/lib/parseRow";

type Props = { siteNumber: number; row?: ParsedRow };

export default function SiteTile({ siteNumber, row }: Props) {
  if (!row) {
    return (
      <div className="border border-rule bg-paper2/40 px-2 py-2.5 text-center">
        <div className="font-mono text-[10px] text-ink4">Site {siteNumber}</div>
        <div className="font-serif text-[18px] text-ink4 mt-1 leading-none">·</div>
      </div>
    );
  }
  const q = qualityOf(row.bi);
  return (
    <div
      className="px-2 py-2.5 text-center"
      style={{
        background: q?.bg,
        border: `0.5px solid ${q?.border}`
      }}
    >
      <div className="font-mono text-[10px]" style={{ color: q?.fg }}>
        Site {siteNumber}
      </div>
      <div
        className="font-serif text-[24px] leading-none mt-0.5"
        style={{ color: q?.fg }}
      >
        {fmt(row.bi, 1)}
      </div>
      <div className="font-mono text-[9px] mt-1" style={{ color: q?.fg }}>
        {row.flow}
      </div>
      <div className="font-mono text-[9px] text-ink4 mt-0.5">
        Grp {row.group || "?"}
      </div>
    </div>
  );
}
