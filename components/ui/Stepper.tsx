"use client";

type Props = {
  count: number;
  onChange: (delta: number) => void;
};

export default function Stepper({ count, onChange }: Props) {
  const active = count > 0;
  return (
    <div className="flex items-center shrink-0">
      <button
        onClick={() => onChange(-1)}
        className="w-9 h-9 border-[0.5px] border-r-0 border-rule bg-paper2/50 text-ink3 text-[20px] flex items-center justify-center"
        aria-label="decrement"
      >
        {"−"}
      </button>
      <div
        className={[
          "w-11 h-9 border-[0.5px] flex items-center justify-center font-mono text-[14px]",
          active
            ? "border-teal bg-teal2 text-teal"
            : "border-rule bg-paper text-ink4"
        ].join(" ")}
      >
        {count}
      </div>
      <button
        onClick={() => onChange(1)}
        className={[
          "w-9 h-9 border-[0.5px] border-l-0 text-[20px] flex items-center justify-center",
          active
            ? "border-teal bg-teal2 text-teal"
            : "border-rule bg-paper2/50 text-teal"
        ].join(" ")}
        aria-label="increment"
      >
        +
      </button>
    </div>
  );
}
