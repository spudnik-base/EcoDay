import type { MeanSd } from "@/lib/aggregations";

type Bar = {
  label: string;
  stat: MeanSd;
  color: string;
};

type Props = {
  bars: Bar[];
  yMax: number;
  yLabel: string;
  decimals?: number;
};

const W = 320;
const H = 180;
const PAD = { t: 16, r: 16, b: 36, l: 32 };

function fmt(n: number | null, d = 2): string {
  return n === null ? "" : n.toFixed(d);
}

export default function PairedBars({ bars, yMax, yLabel, decimals = 2 }: Props) {
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const slot = innerW / bars.length;
  const barW = Math.min(slot * 0.55, 60);

  const yToPx = (v: number) => PAD.t + (1 - v / yMax) * innerH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%" }} className="overflow-visible">
      {/* y axis */}
      <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={H - PAD.b} stroke="#8E7D54" />
      <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="#8E7D54" />

      {/* y ticks at 0, mid, max */}
      {[0, yMax / 2, yMax].map((v, i) => (
        <g key={i}>
          <text x={PAD.l - 4} y={yToPx(v) + 3} fontSize="9" fill="#5A6680" textAnchor="end">
            {fmt(v, decimals)}
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
        {yLabel}
      </text>

      {bars.map((b, i) => {
        const cx = PAD.l + slot * (i + 0.5);
        const x0 = cx - barW / 2;
        const m = b.stat.mean ?? 0;
        const sd = b.stat.sd ?? 0;
        const yMean = yToPx(m);
        const ySdHi = yToPx(Math.min(yMax, m + sd));
        const ySdLo = yToPx(Math.max(0, m - sd));

        return (
          <g key={b.label}>
            {b.stat.mean !== null && (
              <>
                <rect
                  x={x0}
                  y={yMean}
                  width={barW}
                  height={H - PAD.b - yMean}
                  fill={b.color}
                  fillOpacity="0.18"
                  stroke={b.color}
                  strokeWidth="1.2"
                />
                <text
                  x={cx}
                  y={yMean - 6}
                  fontSize="11"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="500"
                  fill="#1C2A48"
                  textAnchor="middle"
                >
                  {fmt(m, decimals)}
                </text>
                {b.stat.sd !== null && (
                  <>
                    <line x1={cx} y1={ySdLo} x2={cx} y2={ySdHi} stroke={b.color} strokeWidth="1.5" />
                    <line x1={cx - 8} y1={ySdHi} x2={cx + 8} y2={ySdHi} stroke={b.color} strokeWidth="1.5" />
                    <line x1={cx - 8} y1={ySdLo} x2={cx + 8} y2={ySdLo} stroke={b.color} strokeWidth="1.5" />
                  </>
                )}
              </>
            )}
            <text
              x={cx}
              y={H - PAD.b + 14}
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
              fill="#1C2A48"
              textAnchor="middle"
            >
              {b.label}
            </text>
            <text
              x={cx}
              y={H - PAD.b + 26}
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              fill="#5A6680"
              textAnchor="middle"
            >
              n = {b.stat.n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
