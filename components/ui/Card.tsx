type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={[
        "bg-paper border border-rule rounded-[2px] px-3.5 py-3 mb-2 shadow-[0_1px_0_rgba(28,42,72,0.04),0_2px_8px_rgba(28,42,72,0.05)]",
        className
      ].join(" ")}
    >
      {children}
    </div>
  );
}
