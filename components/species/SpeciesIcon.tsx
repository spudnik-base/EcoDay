// Each macroinvertebrate icon is its own small SVG component drawn
// in line-art style to match the field-notebook aesthetic. They render
// at any size and inherit colour from the parent (currentColor).
import Stonefly from "./icons/Stonefly";
import Mayfly from "./icons/Mayfly";
import UncasedCaddis from "./icons/UncasedCaddis";
import CasedCaddis from "./icons/CasedCaddis";
import RiffleBeetle from "./icons/RiffleBeetle";
import WaterPenny from "./icons/WaterPenny";
import FlatWorm from "./icons/FlatWorm";
import Damsel from "./icons/Damsel";
import BlackFly from "./icons/BlackFly";
import BeetleLarva from "./icons/BeetleLarva";
import Snail from "./icons/Snail";
import Shrimp from "./icons/Shrimp";
import Leech from "./icons/Leech";
import SegWorm from "./icons/SegWorm";
import type { SpeciesId } from "@/lib/constants";

const REGISTRY: Record<SpeciesId, React.ComponentType<{ className?: string }>> = {
  stonefly:   Stonefly,
  mayfly:     Mayfly,
  uncased:    UncasedCaddis,
  cased:      CasedCaddis,
  riffle:     RiffleBeetle,
  waterpenny: WaterPenny,
  flatworm:   FlatWorm,
  damsel:     Damsel,
  blackfly:   BlackFly,
  beetle:     BeetleLarva,
  snail:      Snail,
  shrimp:     Shrimp,
  leech:      Leech,
  segworm:    SegWorm
};

type Props = {
  id: SpeciesId;
  className?: string;
};

export default function SpeciesIcon({ id, className }: Props) {
  const Icon = REGISTRY[id];
  return <Icon className={className} />;
}
