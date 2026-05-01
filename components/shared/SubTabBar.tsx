"use client";

type Props = {
  tabs: readonly string[];
  active: number;
  onChange: (i: number) => void;
};

// Lighter, paper-toned tab strip used inside a main tab to separate
// activities (e.g. Stream's Setup / Abiotic / Biotic / Results).
export default function SubTabBar({ tabs, active, onChange }: Props) {
  return (
    <div className="flex gap-1 border-b border-rule mb-3">
      {tabs.map((t, i) => {
        const isActive = i === active;
        return (
          <button
            key={t}
            onClick={() => onChange(i)}
            className={[
              "py-2 px-2.5 font-mono uppercase tracking-spec text-[10px] font-medium transition-colors -mb-px",
              isActive
                ? "text-ink border-b-2 border-ink"
                : "text-ink3 hover:text-ink border-b-2 border-transparent"
            ].join(" ")}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
