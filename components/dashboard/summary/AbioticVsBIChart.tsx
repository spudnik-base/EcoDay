import { qualityOf } from "@/lib/calculations";
import type { SitePoint } from "@/lib/abioticAggregations";

type Props = {
  points: SitePoint[];
  xLabel: string;
};

const W = 500;
const H = 200;
const PAD = { t: 18, r: 16, b: 38, l: 42 };

export default function AbioticVsBIChart({ points, xLabel }: Props) {
  if (points.length < 2) {
    return (
      <div className="text-center py-8 font-mono text-[11px] text-ink4">
        Need data from at least 2 sites with both abiotic and biotic readings.
      </div>
    );
  }

  const xs = points.map((p) => p.ab);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const xSpread = Math.max(xMax - xMin, 0.001);
  const yMax = 20;
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const cx = (x: number) =>
    PAD.l + ((x - xMin) / xSpread) * innerW;
  const cy = (y: number) =>
    PAD.t + (1 - y / yMax) * innerH;

  const xLo = xMin - xSpread * 0.05;
  const xHi = xMax + xSpread * 0.05;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%" }} className="overflow-visible">
      {/* axes */}
      <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={H - PAD.b} stroke="#8E7D54" />
      <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="#8E7D54" />

      {/* y ticks */}
      {[0, 10, 20].map((v) => (
        <g key={v}>
          <text x={PAD.l - 4} y={cy(v) + 3} fontSize="9" fill="#5A6680" textAnchor="end">
            {v}
          </text>
          <line x1={PAD.l - 2} y1={cy(v)} x2={PAD.l} y2={cy(v)} stroke="#8E7D54" />
        </g>
      ))}
      {/* BI reference lines */}
      <line
        x1={PAD.l}
        y1={cy(10)}
        x2={W - PAD.r}
        y2={cy(10)}
        stroke="#8E7D54"
        strokeDasharray="3,3"
      />
      <line
        x1={PAD.l}
        y1={cy(3)}
        x2={W - PAD.r}
        y2={cy(3)}
        stroke="#8E7D54"
        strokeDasharray="3,3"
        opacity="0.6"
      />

      {/* axis labels */}
      <text
        x={10}
        y={H / 2}
        fontSize="9"
        fill="#5A6680"
        transform={`rotate(-90 10 ${H / 2})`}
        textAnchor="middle"
      >
        Biotic index
      </text>
      <text
        x={(W - PAD.r + PAD.l) / 2}
        y={H - 6}
        fontSize="10"
        fill="#1C2A48"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
      >
        {xLabel}
      </text>
      <text x={PAD.l} y={H - PAD.b + 12} fontSize="9" fill="#5A6680">
        {xLo.toFixed(2)}
      </text>
      <text x={W - PAD.r} y={H - PAD.b + 12} fontSize="9" fill="#5A6680" textAnchor="end">
        {xHi.toFixed(2)}
      </text>

      {/* points */}
      {points.map((p) => {
        const q = qualityOf(p.bi);
        return (
          <g key={p.site}>
            <circle
              cx={cx(p.ab)}
              cy={cy(p.bi)}
              r="6"
              fill={q?.bg ?? "#fff"}
              stroke={q?.fg ?? "#1C2A48"}
              strokeWidth="1.5"
            />
            <text
              x={cx(p.ab)}
              y={cy(p.bi) - 9}
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              fill="#1C2A48"
              textAnchor="middle"
            >
              S{p.site}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
