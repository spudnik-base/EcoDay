type Props = { className?: string };

// Leech (Hirudinea): elongated worm-like body, two suckers (one at each
// end), no segmented appendages. Tolerant of low-oxygen polluted water
// (tol 3).
export default function Leech({ className }: Props) {
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
      {/* sinuous body outline (S-curve) */}
      <path d="M60 32 Q40 60 50 90 Q70 120 90 140 Q110 160 140 168" />
      <path d="M84 22 Q70 50 80 82 Q102 114 124 138 Q144 158 156 158" />
      {/* anterior sucker (head end) */}
      <ellipse cx="72" cy="27" rx="14" ry="8" transform="rotate(-15 72 27)" />
      <circle cx="78" cy="24" r="1.5" fill="currentColor" />
      <circle cx="68" cy="32" r="1.5" fill="currentColor" />
      {/* posterior sucker (tail end, larger) */}
      <ellipse cx="148" cy="163" rx="16" ry="11" transform="rotate(20 148 163)" />
      <circle cx="148" cy="163" r="3" />
      {/* segmentation rings down body */}
      <path d="M58 42 Q66 38 76 42" />
      <path d="M52 56 Q60 52 70 56" />
      <path d="M48 70 Q56 66 66 72" />
      <path d="M52 84 Q62 82 74 88" />
      <path d="M62 98 Q72 96 84 102" />
      <path d="M76 112 Q86 110 100 116" />
      <path d="M92 126 Q102 124 116 130" />
      <path d="M108 138 Q120 136 132 142" />
      <path d="M124 150 Q136 148 146 152" />
    </svg>
  );
}
