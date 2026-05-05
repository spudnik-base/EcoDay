type Props = { className?: string };

// Freshwater snail: spiral coiled shell with multiple whorls, soft body
// (foot) with head poking out, two tentacles with eye spots at the
// base. Tolerant of moderate pollution (tol 6).
export default function Snail({ className }: Props) {
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
      {/* foot (sole resting on ground) */}
      <path d="M22 162 Q60 148 110 152 Q150 156 178 152 L178 168 Q150 172 110 168 Q60 172 22 178 Z" />
      {/* shell — spiral coil drawn as nested arcs */}
      <circle cx="118" cy="100" r="60" />
      <path d="M118 100 m-48 0 a48 48 0 1 1 96 0 a48 48 0 1 1 -96 0" />
      <path d="M118 100 m-34 0 a34 34 0 1 1 68 0 a34 34 0 1 1 -68 0" />
      <path d="M118 100 m-20 0 a20 20 0 1 1 40 0 a20 20 0 1 1 -40 0" />
      <path d="M118 100 m-8 0 a8 8 0 1 1 16 0 a8 8 0 1 1 -16 0" />
      {/* shell aperture (opening on the lower left) */}
      <path d="M58 110 Q50 130 60 152" />
      {/* body / head emerging from shell */}
      <path d="M58 124 Q42 138 32 142 Q22 146 22 156" />
      <path d="M62 144 Q48 156 36 158" />
      {/* two tentacles with eye spots */}
      <path d="M30 142 Q22 130 18 116" />
      <path d="M40 138 Q34 124 30 110" />
      <circle cx="18" cy="116" r="2" fill="currentColor" />
      <circle cx="30" cy="110" r="2" fill="currentColor" />
    </svg>
  );
}
