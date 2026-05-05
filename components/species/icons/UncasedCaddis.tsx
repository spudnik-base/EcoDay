type Props = { className?: string };

// Uncased / free-living caddisfly (e.g. Rhyacophila): caterpillar-like
// body, no portable case, hooked claspers (anal prolegs) at the rear,
// 6 thoracic legs at the front, lateral abdominal gills as filament
// tufts.
export default function UncasedCaddis({ className }: Props) {
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
      {/* head */}
      <ellipse cx="100" cy="32" rx="14" ry="10" />
      <circle cx="93" cy="30" r="1.6" fill="currentColor" />
      <circle cx="107" cy="30" r="1.6" fill="currentColor" />
      {/* short antennae */}
      <path d="M88 26 Q80 18 74 12" />
      <path d="M112 26 Q120 18 126 12" />
      {/* thorax (3 segments where legs attach) */}
      <path d="M86 42 L86 74" />
      <path d="M114 42 L114 74" />
      <path d="M86 50 L114 50" />
      <path d="M86 60 L114 60" />
      <path d="M86 70 L114 70" />
      {/* 3 pairs of thoracic legs */}
      <path d="M86 48 L62 56 L52 70" />
      <path d="M114 48 L138 56 L148 70" />
      <path d="M86 60 L60 72 L48 90" />
      <path d="M114 60 L140 72 L152 90" />
      <path d="M86 72 L62 86 L52 108" />
      <path d="M114 72 L138 86 L148 108" />
      {/* abdomen with curved caterpillar shape */}
      <path d="M86 76 Q72 100 84 132 Q98 160 100 172" />
      <path d="M114 76 Q128 100 116 132 Q102 160 100 172" />
      {/* abdominal segment grooves */}
      <path d="M82 90 L118 90" />
      <path d="M78 104 L122 104" />
      <path d="M82 118 L118 118" />
      <path d="M88 132 L112 132" />
      <path d="M92 146 L108 146" />
      <path d="M95 160 L105 160" />
      {/* lateral filament gills */}
      <path d="M78 90 Q66 92 60 100" />
      <path d="M122 90 Q134 92 140 100" />
      <path d="M76 108 Q62 112 56 122" />
      <path d="M124 108 Q138 112 144 122" />
      <path d="M82 124 Q70 130 64 142" />
      <path d="M118 124 Q130 130 136 142" />
      {/* hooked anal claspers (key ID) */}
      <path d="M96 172 Q88 184 78 178 Q82 188 92 184" />
      <path d="M104 172 Q112 184 122 178 Q118 188 108 184" />
    </svg>
  );
}
