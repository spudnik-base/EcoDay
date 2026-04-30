import Mountains from "./Mountains";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  badge?: { text: string; bg: string; fg: string; border: string } | null;
  wide?: boolean;
};

export default function Header({ eyebrow, title, subtitle, badge, wide }: Props) {
  return (
    <header className="bg-ink relative overflow-hidden rounded-t-[2px]">
      <div className="px-5 pt-5 pb-2 relative">
        <div className="text-[10px] font-mono uppercase tracking-spec text-paper/50">
          {eyebrow}
        </div>
        <h1 className="font-serif text-paper text-[26px] leading-tight mt-1">
          {title}
        </h1>
        {subtitle && (
          <div className="text-[12px] font-mono text-teal2/80 mt-1">
            {subtitle}
          </div>
        )}
        {badge && (
          <div
            className="absolute top-5 right-5 text-[11px] font-mono uppercase tracking-spec px-3 py-1"
            style={{
              background: badge.bg,
              color: badge.fg,
              border: `0.5px solid ${badge.border}`
            }}
          >
            {badge.text}
          </div>
        )}
      </div>
      <Mountains wide={wide} />
    </header>
  );
}
