type Props = { className?: string };

// Cased caddisfly (Trichoptera) larva: living inside a tube case made of
// sand, stones, sticks. Head and front legs poke out at one end. The
// case is the key ID feature.
export default function CasedCaddis({ className }: Props) {
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
      {/* the tube case (tapered cone) */}
      <path d="M70 80 L60 178 L140 178 L130 80 Z" />
      {/* texture: rough fragments cemented onto case */}
      <circle cx="78" cy="100" r="5" />
      <circle cx="118" cy="105" r="6" />
      <circle cx="92" cy="120" r="4" />
      <circle cx="124" cy="135" r="5" />
      <circle cx="78" cy="148" r="6" />
      <circle cx="108" cy="155" r="4" />
      <circle cx="92" cy="168" r="4" />
      {/* opening rim */}
      <ellipse cx="100" cy="80" rx="30" ry="6" />
      {/* head poking out */}
      <ellipse cx="100" cy="58" rx="14" ry="11" />
      <circle cx="93" cy="56" r="1.5" fill="currentColor" />
      <circle cx="107" cy="56" r="1.5" fill="currentColor" />
      {/* short antennae / mouthparts */}
      <path d="M90 50 Q84 42 78 36" />
      <path d="M110 50 Q116 42 122 36" />
      {/* front legs reaching forward */}
      <path d="M92 65 L72 56 L62 50" />
      <path d="M108 65 L128 56 L138 50" />
      <path d="M92 72 L70 70 L56 66" />
      <path d="M108 72 L130 70 L144 66" />
    </svg>
  );
}
