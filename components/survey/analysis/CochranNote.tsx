import Disclosure from "@/components/ui/Disclosure";

export default function CochranNote() {
  return (
    <div className="mt-3 border border-sepia/40 bg-[#FBEEE6] px-2.5 py-2">
      <div className="font-mono uppercase tracking-spec text-[10px] text-sepia mb-1">
        Cochran warning
      </div>
      <p className="font-serif text-[13px] text-sepia leading-relaxed">
        At least one expected count is below 5. Treat this &chi;&sup2; result
        with caution.
      </p>
      <Disclosure label="why this matters">
        <p className="font-serif text-[13px] text-ink leading-relaxed">
          &chi;&sup2; assumes that observed counts behave roughly like normally
          distributed numbers. When the expected count in any cell is small,
          that approximation breaks down and the test can give misleading
          p-values.
        </p>
        <p className="font-serif text-[13px] text-ink leading-relaxed mt-2">
          Cochran&apos;s rule of thumb: every expected cell should be at least
          5 (some texts say at least 1, with no more than 20% of cells below
          5). Either collect more class data so the expected counts grow, or
          for very small samples use Fisher&apos;s exact test instead.
        </p>
      </Disclosure>
    </div>
  );
}
