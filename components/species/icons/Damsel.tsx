type Props = { className?: string };

// Damselfly (Zygoptera) nymph: slender body, large head with prominent
// eyes, three leaf-shaped tail gills (caudal lamellae) — the key ID
// feature distinguishing it from mayfly.
export default function Damsel({ className }: Props) {
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
      <path d="M86 28 Q78 22 72 16" />
      <path d="M114 28 Q122 22 128 16" />
      {/* large head with big eyes (key feature) */}
      <path d="M70 38 Q70 30 86 28 L114 28 Q130 30 130 38 Q130 50 100 52 Q70 50 70 38 Z" />
      <circle cx="80" cy="38" r="6" fill="currentColor" />
      <circle cx="120" cy="38" r="6" fill="currentColor" />
      {/* slender thorax with wing buds */}
      <path d="M88 54 L86 78" />
      <path d="M112 54 L114 78" />
      <path d="M88 60 Q72 66 72 80" />
      <path d="M112 60 Q128 66 128 80" />
      {/* legs */}
      <path d="M90 64 L66 70 L56 86" />
      <path d="M110 64 L134 70 L144 86" />
      <path d="M88 74 L62 88 L54 108" />
      <path d="M112 74 L138 88 L146 108" />
      {/* slender abdomen, segmented */}
      <path d="M90 80 Q88 110 92 140 Q95 152 96 156" />
      <path d="M110 80 Q112 110 108 140 Q105 152 104 156" />
      <path d="M91 96 L109 96" />
      <path d="M93 110 L107 110" />
      <path d="M94 122 L106 122" />
      <path d="M95 134 L105 134" />
      <path d="M96 146 L104 146" />
      {/* 3 leaf-shaped caudal lamellae (key ID) */}
      <path d="M97 158 Q72 168 64 188 Q86 184 100 170" />
      <path d="M100 158 L100 192" />
      <path d="M103 158 Q128 168 136 188 Q114 184 100 170" />
    </svg>
  );
}
