import { tolColor } from "@/lib/calculations";

type Props = { tol: number };

export default function ToleranceLabel({ tol }: Props) {
  const c = tolColor(tol);
  return (
    <span
      className="inline-block font-mono text-[9px] uppercase tracking-spec px-1.5 py-0.5 mt-1"
      style={{
        background: c.bg,
        color: c.fg,
        border: `0.5px solid ${c.border}`
      }}
    >
      tol {tol}
    </span>
  );
}
