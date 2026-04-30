type Props = {
  label: string;
  value: string;
  unit?: string;
};

export default function StatBox({ label, value, unit }: Props) {
  return (
    <div className="bg-paper2/40 border-[0.5px] border-rule px-3 py-2.5">
      <div className="text-[10px] font-mono uppercase tracking-spec text-ink3 mb-1">
        {label}
      </div>
      <div className="font-serif text-[26px] leading-none text-ink">
        {value || "·"}
        {unit && (
          <span className="font-mono text-[12px] text-ink3 ml-1">{unit}</span>
        )}
      </div>
    </div>
  );
}
