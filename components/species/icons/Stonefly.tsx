type Props = { className?: string };

// Stonefly (Plecoptera) nymph: 2 long antennae, 2 tail cerci, 6 legs,
// segmented elongated abdomen, no abdominal gills. Indicator of clean
// well-oxygenated water (tol 10).
export default function Stonefly({ className }: Props) {
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
      {/* antennae */}
      <path d="M88 32 Q66 22 48 12" />
      <path d="M112 32 Q134 22 152 12" />
      {/* head */}
      <ellipse cx="100" cy="42" rx="14" ry="10" />
      <circle cx="93" cy="40" r="1.6" fill="currentColor" />
      <circle cx="107" cy="40" r="1.6" fill="currentColor" />
      {/* body outline */}
      <path d="M86 52 Q84 80 90 110 Q94 138 96 162" />
      <path d="M114 52 Q116 80 110 110 Q106 138 104 162" />
      {/* segment lines */}
      <path d="M88 65 L112 65" />
      <path d="M88 80 L112 80" />
      <path d="M89 95 L111 95" />
      <path d="M91 110 L109 110" />
      <path d="M93 124 L107 124" />
      <path d="M94 138 L106 138" />
      <path d="M95 150 L105 150" />
      {/* 3 pairs of legs */}
      <path d="M86 60 L60 70 L48 86" />
      <path d="M114 60 L140 70 L152 86" />
      <path d="M85 76 L52 90 L42 110" />
      <path d="M115 76 L148 90 L158 110" />
      <path d="M88 92 L58 110 L50 130" />
      <path d="M112 92 L142 110 L150 130" />
      {/* 2 tail cerci (no gills on abdomen, key ID feature) */}
      <path d="M97 164 Q88 178 76 192" />
      <path d="M103 164 Q112 178 124 192" />
    </svg>
  );
}
