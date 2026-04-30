type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SpecLabel({ children, className = "" }: Props) {
  return (
    <div
      className={[
        "flex items-center gap-2 text-[11px] font-mono uppercase tracking-spec font-medium text-ink2 mb-2",
        className
      ].join(" ")}
    >
      <span>{children}</span>
      <span className="flex-1 border-b border-rule" />
    </div>
  );
}
