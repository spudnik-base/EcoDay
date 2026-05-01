export default function SimpsonInterpretation() {
  return (
    <div className="space-y-2">
      <p className="font-serif text-[13px] text-ink leading-relaxed">
        Simpson&apos;s D ranges from 0 to 1.
      </p>
      <ul className="font-serif text-[13px] text-ink leading-relaxed list-disc pl-5 space-y-1">
        <li>
          <span className="font-medium">D close to 1</span>: many species in
          roughly even numbers. A diverse, often stable, ecosystem.
        </li>
        <li>
          <span className="font-medium">D close to 0</span>: one species
          dominates. Often a sign of disturbance, pollution, or recent
          recovery, but it can also be the natural state of a specialised
          habitat.
        </li>
      </ul>
      <p className="font-serif text-[12px] text-ink3 leading-relaxed">
        Diversity does not always mean &ldquo;better&rdquo;. Some habitats
        (peat bog, mountain stream source) are naturally low-diversity.
        Compare like with like.
      </p>
    </div>
  );
}
