type Props = {
  label: string;
  value: string;
  sub?: string;
  valueColor?: string;
};

export default function StatCard({ label, value, sub, valueColor }: Props) {
  return (
    <div className="bg-paper border-[0.5px] border-rule px-4 py-3.5">
      <div className="text-[10px] font-mono uppercase tracking-spec text-ink3 mb-1">
        {label}
      </div>
      <div
        className="font-serif text-[32px] leading-none tracking-tight"
        style={{ color: valueColor ?? "#1C2A48" }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-[10px] font-mono text-ink4 mt-1.5">{sub}</div>
      )}
    </div>
  );
}
