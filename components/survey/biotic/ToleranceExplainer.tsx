import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";

export default function ToleranceExplainer() {
  return (
    <Card>
      <SpecLabel>What does tol mean?</SpecLabel>
      <p className="font-serif text-[13px] text-ink leading-relaxed">
        Pollution <span className="font-medium">tolerance</span>: how clean a
        stream a species needs. The cleaner the water it requires, the higher
        its tolerance score.
      </p>
      <ul className="mt-2 space-y-1 font-mono text-[11px] text-ink2 leading-relaxed">
        <li className="flex gap-2">
          <span className="inline-block w-12 text-center" style={{
            background: "#DEEAE3", color: "#21503F", border: "1px solid #7FB29A"
          }}>tol 10</span>
          <span>only in clean, oxygen-rich water (mayfly, stonefly)</span>
        </li>
        <li className="flex gap-2">
          <span className="inline-block w-12 text-center" style={{
            background: "#DCE3EE", color: "#1C2A48", border: "1px solid #7E92B7"
          }}>tol 8</span>
          <span>moderately clean water</span>
        </li>
        <li className="flex gap-2">
          <span className="inline-block w-12 text-center" style={{
            background: "#F0E3CB", color: "#6C4A0E", border: "1px solid #C49B4A"
          }}>tol 6</span>
          <span>tolerant of some pollution</span>
        </li>
        <li className="flex gap-2">
          <span className="inline-block w-12 text-center" style={{
            background: "#F1DCD2", color: "#7A2A12", border: "1px solid #C57A5C"
          }}>tol 2-3</span>
          <span>survive in polluted, low-oxygen water (leech, segmented worm)</span>
        </li>
      </ul>
    </Card>
  );
}
