"use client";

type Props = {
  tabs: readonly string[];
  active: number;
  onChange: (i: number) => void;
};

export default function TabBar({ tabs, active, onChange }: Props) {
  return (
    <div className="bg-ink flex border-t border-white/10">
      {tabs.map((t, i) => {
        const isActive = i === active;
        return (
          <button
            key={t}
            onClick={() => onChange(i)}
            className={[
              "flex-1 py-2.5 font-mono text-[10px] uppercase tracking-spec transition-colors",
              isActive ? "text-paper" : "text-paper/40 hover:text-paper/70"
            ].join(" ")}
            style={{
              borderBottom: isActive
                ? "2px solid #6FAE93"
                : "2px solid transparent"
            }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
