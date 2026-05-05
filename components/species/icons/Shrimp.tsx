type Props = { className?: string };

// Freshwater shrimp / scud (Gammarus): laterally compressed body that
// curves into a comma shape, many pairs of legs underneath, two
// antennae at the front. Common in clean cool streams.
export default function Shrimp({ className }: Props) {
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
      {/* curved C-shaped body, viewed from the side */}
      <path d="M52 70 Q40 110 60 150 Q90 180 140 178 Q170 174 168 156 Q160 130 130 130" />
      <path d="M62 60 Q50 100 70 138 Q92 162 130 156 Q150 152 148 142 Q140 124 116 122" />
      {/* head end — eye and antennae */}
      <circle cx="58" cy="68" r="2" fill="currentColor" />
      {/* two long antennae */}
      <path d="M50 64 Q34 50 22 36" />
      <path d="M48 72 Q30 70 14 76" />
      {/* short rostrum */}
      <path d="M55 60 Q48 52 42 46" />
      {/* segmented body lines on the curve */}
      <path d="M50 88 L66 86" />
      <path d="M48 100 L66 98" />
      <path d="M50 114 L70 112" />
      <path d="M58 130 L76 130" />
      <path d="M70 144 L86 146" />
      <path d="M86 156 L100 158" />
      <path d="M104 162 L120 160" />
      {/* legs / pereiopods underneath */}
      <path d="M64 152 L60 178" />
      <path d="M76 158 L74 186" />
      <path d="M90 162 L92 188" />
      <path d="M104 162 L110 188" />
      <path d="M118 158 L126 184" />
      <path d="M132 152 L142 176" />
      {/* tail fan at posterior */}
      <path d="M150 142 L168 134" />
      <path d="M152 148 L170 144" />
      <path d="M152 154 L168 156" />
    </svg>
  );
}
