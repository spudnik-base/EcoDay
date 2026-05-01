import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import Disclosure from "@/components/ui/Disclosure";

export default function HypothesisPrimer() {
  return (
    <Card>
      <SpecLabel>What is a chi-squared test?</SpecLabel>
      <p className="font-serif text-[13px] text-ink leading-relaxed">
        A statistical way to check whether a pattern in your data is real or
        just down to chance. We test two species&apos; co-occurrence here.
      </p>
      <Disclosure label="hypotheses, p-value, what 0.05 means">
        <div className="space-y-2">
          <p className="font-serif text-[13px] text-ink leading-relaxed">
            <span className="font-medium">H&#8320; (null hypothesis):</span>{" "}
            nothing&apos;s going on. The two species are independent. Any
            apparent association is a fluke of sampling.
          </p>
          <p className="font-serif text-[13px] text-ink leading-relaxed">
            <span className="font-medium">H&#8321; (alternative hypothesis):</span>{" "}
            the two species are associated, either positively (occur together)
            or negatively (avoid each other).
          </p>
          <p className="font-serif text-[13px] text-ink leading-relaxed">
            &chi;&sup2; compares your <em>observed</em> counts to the counts
            you would <em>expect</em> if H&#8320; were true. A big gap between
            observed and expected makes &chi;&sup2; large.
          </p>
          <p className="font-serif text-[13px] text-ink leading-relaxed">
            <span className="font-medium">Critical value at p = 0.05, df = 1
            is 3.84.</span> If your &chi;&sup2; is bigger than 3.84, the
            pattern is unlikely under H&#8320;, so we reject it. The
            &ldquo;5%&rdquo; means we will be wrong about 1 in 20 times if
            H&#8320; is in fact true. That risk is the price of making a
            decision from data.
          </p>
        </div>
      </Disclosure>
    </Card>
  );
}
