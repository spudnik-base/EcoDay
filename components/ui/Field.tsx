"use client";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  step?: string;
  min?: string;
  max?: string;
  className?: string;
  filled?: boolean;
  filledTone?: "teal" | "moss";
};

export default function Field({
  value,
  onChange,
  placeholder,
  step = "0.01",
  min,
  max,
  className = "",
  filled,
  filledTone = "teal"
}: Props) {
  const tone =
    filledTone === "moss"
      ? "border-moss text-moss bg-moss2"
      : "border-teal text-teal bg-teal2";
  return (
    <input
      type="number"
      step={step}
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={[
        "h-10 w-full px-2 text-center text-[14px] border-[0.5px] focus:border-ink",
        filled ? tone : "border-rule text-ink",
        className
      ].join(" ")}
    />
  );
}
