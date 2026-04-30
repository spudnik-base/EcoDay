"use client";

type Variant = "primary" | "ghost" | "danger" | "ok" | "fail";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
};

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper border-ink",
  ghost:   "bg-paper text-ink border-rule hover:border-ink",
  danger:  "bg-paper text-sepia border-sepia/60 hover:border-sepia",
  ok:      "bg-teal2 text-teal border-teal",
  fail:    "bg-[#F1DCD2] text-sepia border-sepia"
};

export default function Button({
  children,
  onClick,
  variant = "ghost",
  disabled,
  className = "",
  type = "button"
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        "w-full h-11 px-3 font-mono uppercase tracking-spec text-[11px] border transition-colors disabled:opacity-50",
        variants[variant],
        className
      ].join(" ")}
    >
      {children}
    </button>
  );
}
