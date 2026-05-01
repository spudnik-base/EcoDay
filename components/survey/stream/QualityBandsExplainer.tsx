export default function QualityBandsExplainer() {
  const bands = [
    {
      txt: "Good (BI > 10)",
      bg: "#E4EAD2", fg: "#3C5518", border: "#9DB272",
      desc: "Clean, well-oxygenated water. Sensitive species (mayfly, stonefly, caddisfly) survive only in conditions like this. A trustworthy biological indicator of low pollution."
    },
    {
      txt: "Average (BI 3-10)",
      bg: "#F5EBC8", fg: "#7A5500", border: "#C9A94A",
      desc: "Some pollution stress. Tolerant and intolerant species coexist. Could be intermittent run-off, organic enrichment, or a slower-flowing reach with naturally lower oxygen."
    },
    {
      txt: "Poor (BI < 3)",
      bg: "#F1DCD2", fg: "#7A2A12", border: "#C57A5C",
      desc: "Polluted or low-oxygen water. Only tough species (leech, segmented worm) persist. Sensitive species are absent, suggesting persistent environmental stress."
    }
  ];
  return (
    <div className="space-y-2">
      {bands.map((b) => (
        <div
          key={b.txt}
          className="px-2.5 py-2 border"
          style={{ background: b.bg, borderColor: b.border }}
        >
          <div
            className="font-mono uppercase tracking-spec text-[10px] mb-1"
            style={{ color: b.fg }}
          >
            {b.txt}
          </div>
          <p className="font-serif text-[13px] leading-relaxed" style={{ color: b.fg }}>
            {b.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
