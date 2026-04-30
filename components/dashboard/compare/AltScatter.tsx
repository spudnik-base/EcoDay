import { qualityOf } from "@/lib/calculations";
import type { ParsedRow } from "@/lib/parseRow";

type Props = { rows: ParsedRow[] };

const W = 500;
const H = 160;
const PAD = { t: 16, r: 12, b: 30, l: 36 };

export default function AltScatter({ rows }: Props) {
  const valid = rows.filter((r) => !Number.isNaN(r.alt) && !Number.isNaN(r.bi));
  if (valid.length < 3) {
    return (
      <div className="text-center py-6 font-mono text-[11px] text-ink4">
        Need at least 3 sites with GPS altitude captured
      </div>
    );
  }
  const minAlt = Math.min(...valid.map((r) => r.alt));
  const maxAlt = Math.max(...valid.map((r) => r.alt));
  const maxBI = 20;
  const cx = (alt: number) =>
    PAD.l + ((alt - minAlt) / (maxAlt - minAlt + 1)) * (W - PAD.l - PAD.r);
  const cy = (bi: number) =>
    PAD.t + (1 - bi / maxBI) * (H - PAD.t - PAD.b);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%" }} className="overflow-visible">
      <line
        x1={PAD.l}
        y1={PAD.t}
        x2={PAD.l}
        y2={H - PAD.b}
        stroke="#C9BFA4"
      />
      <line
        x1={PAD.l}
        y1={H - PAD.b}
        x2={W - PAD.r}
        y2={H - PAD.b}
        stroke="#C9BFA4"
      />
      <line
        x1={PAD.l}
        y1={PAD.t + (1 - 10 / maxBI) * (H - PAD.t - PAD.b)}
        x2={W - PAD.r}
        y2={PAD.t + (1 - 10 / maxBI) * (H - PAD.t - PAD.b)}
        stroke="#C9BFA4"
        strokeDasharray="3,3"
      />
      <text x={PAD.l - 4} y={H - PAD.b} fontSize="9" fill="#9AA0B0" textAnchor="end">0</text>
      <text x={PAD.l - 4} y={PAD.t + (1 - 10 / maxBI) * (H - PAD.t - PAD.b) + 3} fontSize="9" fill="#9AA0B0" textAnchor="end">10</text>
      <text x={PAD.l} y={H - PAD.b + 12} fontSize="9" fill="#9AA0B0">{Math.round(minAlt)}m</text>
      <text x={W - PAD.r} y={H - PAD.b + 12} fontSize="9" fill="#9AA0B0" textAnchor="end">{Math.round(maxAlt)}m</text>
      <text
        x="10"
        y={H / 2}
        fontSize="9"
        fill="#9AA0B0"
        transform={`rotate(-90 10 ${H / 2})`}
        textAnchor="middle"
      >
        Biotic index
      </text>
      {valid.map((r, i) => {
        const q = qualityOf(r.bi);
        return (
          <g key={i}>
            <circle cx={cx(r.alt)} cy={cy(r.bi)} r="5" fill={q?.bg} stroke={q?.fg} strokeWidth="1" />
            <text x={cx(r.alt)} y={cy(r.bi) - 8} fontSize="9" fill="#5A6680" textAnchor="middle">
              S{r.site}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
