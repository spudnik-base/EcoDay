type Props = { className?: string };

// Black fly larva (Simuliidae): bowling-pin or club-shaped body,
// attached to the substrate by a hooked posterior end, prominent
// fan-like cephalic feeding structure at the head end.
export default function BlackFly({ className }: Props) {
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
      {/* bowling-pin body, narrow at attachment (top), wide at head (bottom) */}
      <path d="M84 30 Q78 60 72 120 Q66 168 100 178 Q134 168 128 120 Q122 60 116 30" />
      {/* attachment hooked posterior at top */}
      <path d="M84 30 Q90 18 100 22 Q110 18 116 30" />
      <path d="M92 26 Q96 14 100 16 Q104 14 108 26" />
      {/* segment grooves around the body */}
      <path d="M82 50 Q100 54 118 50" />
      <path d="M78 70 Q100 74 122 70" />
      <path d="M74 92 Q100 96 126 92" />
      <path d="M70 116 Q100 120 130 116" />
      <path d="M68 138 Q100 142 132 138" />
      <path d="M70 158 Q100 162 130 158" />
      {/* head with fan-like feeding cephalic structures (the fans) */}
      <ellipse cx="100" cy="178" rx="22" ry="9" />
      {/* two filter fans flaring from the head */}
      <path d="M86 184 Q70 192 56 196 Q70 192 80 188" />
      <path d="M114 184 Q130 192 144 196 Q130 192 120 188" />
      <path d="M88 188 Q72 196 60 200 Q74 196 84 192" />
      <path d="M112 188 Q128 196 140 200 Q126 196 116 192" />
      {/* eye spots */}
      <circle cx="92" cy="178" r="1.6" fill="currentColor" />
      <circle cx="108" cy="178" r="1.6" fill="currentColor" />
    </svg>
  );
}
