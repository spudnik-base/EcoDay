type Props = { className?: string };

// Aquatic beetle larva (e.g. dytiscid): elongated segmented body,
// 3 pairs of legs at the front (thoracic), distinct head with
// pincer-like mandibles, often a paired tail filament or siphon
// at the rear.
export default function BeetleLarva({ className }: Props) {
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
      {/* head with mandibles (pincers) */}
      <path d="M82 22 Q72 14 60 18" />
      <path d="M118 22 Q128 14 140 18" />
      <ellipse cx="100" cy="32" rx="16" ry="11" />
      <circle cx="93" cy="30" r="1.6" fill="currentColor" />
      <circle cx="107" cy="30" r="1.6" fill="currentColor" />
      {/* tapering segmented body */}
      <path d="M84 42 Q80 80 88 130 Q94 160 96 172" />
      <path d="M116 42 Q120 80 112 130 Q106 160 104 172" />
      {/* segment grooves */}
      <path d="M83 56 L117 56" />
      <path d="M82 70 L118 70" />
      <path d="M83 84 L117 84" />
      <path d="M85 100 L115 100" />
      <path d="M88 116 L112 116" />
      <path d="M91 132 L109 132" />
      <path d="M93 146 L107 146" />
      <path d="M94 160 L106 160" />
      {/* 3 pairs of legs from the thorax */}
      <path d="M82 50 L60 56 L48 70" />
      <path d="M118 50 L140 56 L152 70" />
      <path d="M81 64 L56 72 L42 90" />
      <path d="M119 64 L144 72 L158 90" />
      <path d="M82 78 L58 90 L46 110" />
      <path d="M118 78 L142 90 L154 110" />
      {/* paired posterior filaments (urogomphi) */}
      <path d="M97 174 Q90 184 82 196" />
      <path d="M103 174 Q110 184 118 196" />
    </svg>
  );
}
