type Props = { className?: string };

// Flatworm (Planaria): flat ribbon-like body, unsegmented, distinct
// arrow-shaped head with two ear-like projections (auricles) and two
// crossed eye spots. Glides on a film of mucus.
export default function FlatWorm({ className }: Props) {
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
      {/* arrow-shaped head with two auricles */}
      <path d="M68 38 Q60 28 76 22 Q100 16 124 22 Q140 28 132 38" />
      {/* body sides, tapering to tail */}
      <path d="M68 38 Q60 80 70 130 Q86 168 100 184" />
      <path d="M132 38 Q140 80 130 130 Q114 168 100 184" />
      {/* central midline */}
      <path d="M100 22 Q100 80 100 184" strokeDasharray="0 0" opacity="0.55" />
      {/* two crossed eye spots near head (the classic planarian look) */}
      <ellipse cx="91" cy="44" rx="3" ry="2.5" fill="currentColor" />
      <ellipse cx="109" cy="44" rx="3" ry="2.5" fill="currentColor" />
      {/* faint horizontal striations giving body subtle pattern */}
      <path d="M76 60 Q100 64 124 60" opacity="0.5" />
      <path d="M74 80 Q100 84 126 80" opacity="0.5" />
      <path d="M76 102 Q100 106 124 102" opacity="0.5" />
      <path d="M80 122 Q100 126 120 122" opacity="0.5" />
      <path d="M84 142 Q100 146 116 142" opacity="0.5" />
      {/* pharynx hint, midbody */}
      <ellipse cx="100" cy="100" rx="6" ry="14" opacity="0.55" />
    </svg>
  );
}
