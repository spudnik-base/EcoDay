type Props = { className?: string };

// Water penny (Psephenidae larva): looks like a flat coin viewed from
// above. Body is a low rounded shield with the legs and head tucked
// completely underneath. Concentric segment plates give it a textured
// disc appearance.
export default function WaterPenny({ className }: Props) {
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
      {/* outer disc */}
      <circle cx="100" cy="100" r="76" />
      {/* concentric segment plate edges (key visual feature) */}
      <ellipse cx="100" cy="100" rx="64" ry="52" />
      <ellipse cx="100" cy="100" rx="50" ry="38" />
      <ellipse cx="100" cy="100" rx="34" ry="22" />
      {/* radial segment lines on the body, like coin spokes */}
      <path d="M100 24 L100 176" />
      <path d="M24 100 L176 100" />
      <path d="M46 46 L154 154" />
      <path d="M154 46 L46 154" />
      <path d="M68 28 L132 172" />
      <path d="M132 28 L68 172" />
      <path d="M28 68 L172 132" />
      <path d="M28 132 L172 68" />
      {/* central pinhead */}
      <circle cx="100" cy="100" r="4" fill="currentColor" />
    </svg>
  );
}
