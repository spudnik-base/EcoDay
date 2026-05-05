type Props = { className?: string };

// Mayfly (Ephemeroptera) nymph: short antennae, 3 tail filaments,
// leaf-like gills along the sides of the abdomen. Indicator of clean
// well-oxygenated water (tol 10).
export default function Mayfly({ className }: Props) {
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
      {/* short antennae */}
      <path d="M90 30 Q82 22 76 14" />
      <path d="M110 30 Q118 22 124 14" />
      {/* head */}
      <ellipse cx="100" cy="40" rx="13" ry="9" />
      <circle cx="93" cy="38" r="1.5" fill="currentColor" />
      <circle cx="107" cy="38" r="1.5" fill="currentColor" />
      {/* body */}
      <path d="M88 50 Q86 78 92 110 Q97 138 98 158" />
      <path d="M112 50 Q114 78 108 110 Q103 138 102 158" />
      {/* abdominal segment lines */}
      <path d="M89 70 L111 70" />
      <path d="M91 86 L109 86" />
      <path d="M93 102 L107 102" />
      <path d="M95 116 L105 116" />
      <path d="M96 130 L104 130" />
      <path d="M97 144 L103 144" />
      {/* leaf gills along the abdomen, paired (key ID) */}
      <path d="M89 76 Q72 78 64 86 Q72 88 90 86" />
      <path d="M111 76 Q128 78 136 86 Q128 88 110 86" />
      <path d="M91 96 Q70 98 60 108 Q72 110 92 108" />
      <path d="M109 96 Q130 98 140 108 Q128 110 108 108" />
      <path d="M93 116 Q74 120 66 130 Q78 132 95 128" />
      <path d="M107 116 Q126 120 134 130 Q122 132 105 128" />
      {/* 3 pairs of legs from thorax */}
      <path d="M88 58 L66 64 L54 76" />
      <path d="M112 58 L134 64 L146 76" />
      <path d="M86 70 L58 76 L46 90" />
      <path d="M114 70 L142 76 L154 90" />
      {/* 3 tail filaments (key difference from stonefly) */}
      <path d="M97 160 Q90 174 82 190" />
      <path d="M100 160 L100 192" />
      <path d="M103 160 Q110 174 118 190" />
    </svg>
  );
}
