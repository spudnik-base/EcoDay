"use client";

type Props = {
  values: number[];
  current: string;
  onPick: (v: string) => void;
};

export default function NumGrid({ values, current, onPick }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {values.map((n) => {
        const isActive = current === String(n);
        return (
          <button
            key={n}
            onClick={() => onPick(String(n))}
            className={[
              "w-10 h-10 font-mono text-[15px] font-medium transition-colors",
              isActive
                ? "ink-stamp bg-paper text-ink"
                : "bg-paper text-ink2 border border-rule hover:border-ink"
            ].join(" ")}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}
