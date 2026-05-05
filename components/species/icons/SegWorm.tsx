type Props = { className?: string };

// Segmented worm (Oligochaeta, e.g. tubifex): long thin body, distinct
// segmentation, no legs or appendages. Often coiled. Highly tolerant
// (tol 2) — survives in very low oxygen, often dominant in polluted
// sediments.
export default function SegWorm({ className }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* body: a coiling worm path, drawn as two parallel lines */}
      <path d="M40 40 Q70 30 100 50 Q130 70 130 100 Q130 130 100 140 Q70 150 60 130 Q50 110 80 100 Q110 92 130 110 Q150 130 140 158 Q130 180 100 178" />
      <path d="M44 50 Q70 42 96 60 Q120 76 120 100 Q120 124 100 132 Q80 138 72 124 Q62 108 88 92 Q116 84 138 102 Q160 124 150 156 Q140 186 102 188" />
      {/* head end (slightly tapered) */}
      <circle cx="38" cy="44" r="3" fill="currentColor" />
      {/* segmentation tick marks across the body */}
      <path d="M52 38 L52 50" />
      <path d="M65 33 L65 47" />
      <path d="M80 32 L80 48" />
      <path d="M94 38 L94 53" />
      <path d="M108 50 L113 64" />
      <path d="M120 70 L132 72" />
      <path d="M124 90 L138 90" />
      <path d="M118 110 L130 116" />
      <path d="M105 124 L110 138" />
      <path d="M88 132 L94 144" />
      <path d="M70 132 L76 142" />
      <path d="M75 110 L84 116" />
      <path d="M105 92 L110 104" />
      <path d="M132 110 L142 108" />
      <path d="M148 132 L156 132" />
      <path d="M150 152 L142 162" />
      <path d="M132 168 L126 178" />
    </svg>
  );
}
