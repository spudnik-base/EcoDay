type Props = { className?: string };

// Riffle beetle (Elmidae) adult: small oval beetle viewed from above.
// Hardened forewings (elytra) meeting in a midline, distinct head and
// pronotum, six legs visible from above, two short antennae. Lives on
// stones in fast oxygenated water (tol 10).
export default function RiffleBeetle({ className }: Props) {
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
      {/* head + clubbed antennae */}
      <ellipse cx="100" cy="38" rx="12" ry="8" />
      <path d="M88 36 Q76 28 66 22" />
      <path d="M112 36 Q124 28 134 22" />
      <circle cx="65" cy="22" r="3" fill="currentColor" />
      <circle cx="135" cy="22" r="3" fill="currentColor" />
      <circle cx="94" cy="36" r="1.5" fill="currentColor" />
      <circle cx="106" cy="36" r="1.5" fill="currentColor" />
      {/* pronotum (shield behind head) */}
      <path d="M82 50 Q82 44 100 44 Q118 44 118 50 L120 70 L80 70 Z" />
      {/* elytra (hardened wing covers, meeting at midline) */}
      <path d="M76 70 Q70 110 80 156 Q90 180 100 184" />
      <path d="M124 70 Q130 110 120 156 Q110 180 100 184" />
      <path d="M100 70 L100 184" />
      {/* longitudinal striations on elytra */}
      <path d="M88 80 Q86 120 92 160" opacity="0.55" />
      <path d="M112 80 Q114 120 108 160" opacity="0.55" />
      <path d="M82 90 Q78 130 86 170" opacity="0.45" />
      <path d="M118 90 Q122 130 114 170" opacity="0.45" />
      {/* six legs sticking out from beneath the body */}
      <path d="M82 60 L60 56 L48 60" />
      <path d="M118 60 L140 56 L152 60" />
      <path d="M76 96 L52 96 L42 108" />
      <path d="M124 96 L148 96 L158 108" />
      <path d="M80 132 L60 144 L52 158" />
      <path d="M120 132 L140 144 L148 158" />
    </svg>
  );
}
