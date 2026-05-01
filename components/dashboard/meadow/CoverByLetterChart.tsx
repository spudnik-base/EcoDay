import type { CoverByLetter } from "@/lib/meadowAggregations";

type Props = { rows: CoverByLetter[] };

const W = 600;
const H = 220;
const PAD = { t: 18, r: 16, b: 50, l: 36 };
const MARSH = "#4B6A2C";
const DRAINED = "#A47A1B";

function f(n: number, d = 0): string {
  return n.toFixed(d);
}

export default function CoverByLetterChart({ rows }: Props) {
  const max = Math.max(
    ...rows.flatMap((r) => [
      (r.marsh.mean ?? 0) + (r.marsh.sd ?? 0),
      (r.drained.mean ?? 0) + (r.drained.sd ?? 0)
    ]),
    20
  );
  const yMax = Math.ceil(max / 10) * 10;

  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const slot = innerW / rows.length;
  const barW = Math.min((slot - 4) / 2, 14);
  const yToPx = (v: number) => PAD.t + (1 - v / yMax) * innerH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%" }} className="overflow-visible">
      <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={H - PAD.b} stroke="#8E7D54" />
      <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="#8E7D54" />
      {[0, yMax / 2, yMax].map((v, i) => (
        <g key={i}>
          <text x={PAD.l - 4} y={yToPx(v) + 3} fontSize="9" fill="#5A6680" textAnchor="end">
            {f(v)}
          </text>
          <line x1={PAD.l - 2} y1={yToPx(v)} x2={PAD.l} y2={yToPx(v)} stroke="#8E7D54" />
        </g>
      ))}
      <text
        x={10}
        y={H / 2}
        fontSize="9"
        fill="#5A6680"
        transform={`rotate(-90 10 ${H / 2})`}
        textAnchor="middle"
      >
        % cover
      </text>

      {rows.map((r, i) => {
        const cx = PAD.l + slot * (i + 0.5);
        const xMarsh = cx - barW - 1;
        const xDrained = cx + 1;
        const mMean = r.marsh.mean ?? 0;
        const dMean = r.drained.mean ?? 0;
        return (
          <g key={r.letter}>
            {r.marsh.mean !== null && (
              <rect
                x={xMarsh}
                y={yToPx(mMean)}
                width={barW}
                height={H - PAD.b - yToPx(mMean)}
                fill={MARSH}
                fillOpacity="0.25"
                stroke={MARSH}
                strokeWidth="1"
              />
            )}
            {r.marsh.sd !== null && r.marsh.mean !== null && (
              <line
                x1={xMarsh + barW / 2}
                y1={yToPx(Math.min(yMax, mMean + r.marsh.sd))}
                x2={xMarsh + barW / 2}
                y2={yToPx(Math.max(0, mMean - r.marsh.sd))}
                stroke={MARSH}
                strokeWidth="1.2"
              />
            )}
            {r.drained.mean !== null && (
              <rect
                x={xDrained}
                y={yToPx(dMean)}
                width={barW}
                height={H - PAD.b - yToPx(dMean)}
                fill={DRAINED}
                fillOpacity="0.25"
                stroke={DRAINED}
                strokeWidth="1"
              />
            )}
            {r.drained.sd !== null && r.drained.mean !== null && (
              <line
                x1={xDrained + barW / 2}
                y1={yToPx(Math.min(yMax, dMean + r.drained.sd))}
                x2={xDrained + barW / 2}
                y2={yToPx(Math.max(0, dMean - r.drained.sd))}
                stroke={DRAINED}
                strokeWidth="1.2"
              />
            )}
            <text
              x={cx}
              y={H - PAD.b + 14}
              fontSize="11"
              fontFamily="EB Garamond, serif"
              fontWeight="500"
              fill="#1C2A48"
              textAnchor="middle"
            >
              {r.letter}
            </text>
          </g>
        );
      })}

      {/* legend */}
      <g transform={`translate(${PAD.l}, ${H - 12})`}>
        <rect x={0} y={-8} width={10} height={10} fill={MARSH} fillOpacity="0.25" stroke={MARSH} />
        <text x={14} y={0} fontSize="9" fill="#1C2A48">Marsh</text>
        <rect x={64} y={-8} width={10} height={10} fill={DRAINED} fillOpacity="0.25" stroke={DRAINED} />
        <text x={78} y={0} fontSize="9" fill="#1C2A48">Drained</text>
      </g>
    </svg>
  );
}
