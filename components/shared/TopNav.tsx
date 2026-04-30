import Link from "next/link";

type Props = { current: "survey" | "dashboard" };

const ITEMS: ReadonlyArray<["survey" | "dashboard", string, string]> = [
  ["survey",    "Survey",          "/"],
  ["dashboard", "Class dashboard", "/dashboard"]
];

export default function TopNav({ current }: Props) {
  return (
    <nav className="flex items-center gap-1 px-1 pb-2.5 text-[10px] font-mono uppercase tracking-spec">
      {ITEMS.map(([key, label, href], i) => {
        const active = current === key;
        return (
          <span key={key} className="flex items-center gap-1">
            {i > 0 && <span className="text-ink4">·</span>}
            <Link
              href={href}
              className={[
                "px-1 py-1 transition-colors",
                active
                  ? "text-ink font-medium border-b border-ink"
                  : "text-ink3 hover:text-ink"
              ].join(" ")}
            >
              {label}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
