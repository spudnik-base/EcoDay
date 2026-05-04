import type { MeanSd } from "@/lib/aggregations";

type Props = {
  perSite: MeanSd[];
  yMax: number;
  yLabel: string;
  color: string;
  decimals?: number;
};

const W = 600;
const H = 220;
const PAD = { t: 18, r: 16, b: 36, l: 40 };

function f(n: number, d: number): string {
  return n.toFixed(d);
}

// Per-site bar chart with SD whiskers, neutral colour (no quality bands).
// Used for abiotic factors where the value isn't ranked good/bad.
export default function AbioticPerSiteChart({
  perSite,
  yMax,
  yLabel,
  color,
  decimals = 2
}: Props) {
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const slot = innerW / perSite.length;
  const barW = Math.min(slot * 0.6, 40);
  const yToPx = (v: number) => PAD.t + (1 - v / yMax) * innerH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%" }} className="overflow-visible">
      <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={H - PAD.b} stroke="#8E7D54" />
      <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="#8E7D54" />

      {[0, yMax / 2, yMax].map((v, i) => (
        <g key={i}>
          <text x={PAD.l - 4} y={yToPx(v) + 3} fontSize="9" fill="#5A6680" textAnchor="end">
            {f(v, decimals)}
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

      {perSite.map((s, i) => {
        const cx = PAD.l + slot * (i + 0.5);
        const x0 = cx - barW / 2;
        const m = s.mean ?? 0;
        const sd = s.sd ?? 0;
        const yMean = yToPx(m);
        const ySdHi = yToPx(Math.min(yMax, m + sd));
        const ySdLo = yToPx(Math.max(0, m - sd));
        return (
          <g key={i}>
            {s.mean !== null ? (
              <>
                <rect
                  x={x0}
                  y={yMean}
                  width={barW}
                  height={H - PAD.b - yMean}
                  fill={color}
                  fillOpacity="0.18"
                  stroke={color}
                  strokeWidth="1"
                />
                <text
                  x={cx}
                  y={yMean - 4}
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="500"
                  fill={color}
                  textAnchor="middle"
                >
                  {f(m, decimals)}
                </text>
                {s.sd !== null && (
                  <>
                    <line x1={cx} y1={ySdLo} x2={cx} y2={ySdHi} stroke={color} strokeWidth="1.2" />
                    <line x1={cx - 5} y1={ySdHi} x2={cx + 5} y2={ySdHi} stroke={color} strokeWidth="1.2" />
                    <line x1={cx - 5} y1={ySdLo} x2={cx + 5} y2={ySdLo} stroke={color} strokeWidth="1.2" />
                  </>
                )}
              </>
            ) : (
              <rect x={x0} y={H - PAD.b - 2} width={barW} height="2" fill="#C9BFA4" />
            )}
            <text
              x={cx}
              y={H - PAD.b + 14}
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
              fill={s.mean !== null ? "#1C2A48" : "#9AA0B0"}
              textAnchor="middle"
            >
              S{i + 1}
            </text>
            <text
              x={cx}
              y={H - PAD.b + 26}
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              fill="#5A6680"
              textAnchor="middle"
            >
              n={s.n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
