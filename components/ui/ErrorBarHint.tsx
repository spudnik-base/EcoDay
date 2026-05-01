type Props = {
  className?: string;
};

export default function ErrorBarHint({ className = "" }: Props) {
  return (
    <p
      className={[
        "font-mono text-[10px] text-ink3 leading-relaxed mt-2",
        className
      ].join(" ")}
    >
      Error bars show &plusmn; 1 SD across class submissions. If two bars&apos;
      ranges <span className="text-ink font-medium">overlap</span>, the
      difference is probably <span className="text-ink font-medium">not
      significant</span>. If they <span className="text-ink font-medium">do
      not overlap</span>, the difference is likely{" "}
      <span className="text-ink font-medium">real</span>.
    </p>
  );
}
