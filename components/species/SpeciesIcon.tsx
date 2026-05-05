// Each macroinvertebrate icon is its own small SVG component drawn
// in line-art style to match the field-notebook aesthetic. They render
// at any size and inherit colour from the parent (currentColor).
import Stonefly from "./icons/Stonefly";
import Mayfly from "./icons/Mayfly";
import CasedCaddis from "./icons/CasedCaddis";
import Leech from "./icons/Leech";
import SegWorm from "./icons/SegWorm";
import Damsel from "./icons/Damsel";
import Shrimp from "./icons/Shrimp";
import FlatWorm from "./icons/FlatWorm";
import BlackFly from "./icons/BlackFly";
import BeetleLarva from "./icons/BeetleLarva";
import type { SpeciesId } from "@/lib/constants";

const REGISTRY: Partial<Record<SpeciesId, React.ComponentType<{ className?: string }>>> = {
  stonefly: Stonefly,
  mayfly:   Mayfly,
  cased:    CasedCaddis,
  leech:    Leech,
  segworm:  SegWorm,
  damsel:   Damsel,
  shrimp:   Shrimp,
  flatworm: FlatWorm,
  blackfly: BlackFly,
  beetle:   BeetleLarva
};

type Props = {
  id: SpeciesId;
  className?: string;
};

export default function SpeciesIcon({ id, className }: Props) {
  const Icon = REGISTRY[id];
  if (!Icon) return null;
  return <Icon className={className} />;
}
