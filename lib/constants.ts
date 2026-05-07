export const SPECIES = [
  { id: "stonefly",   name: "Stonefly nymph",        tol: 10 },
  { id: "mayfly",     name: "Mayfly nymph",          tol: 10 },
  { id: "uncased",    name: "Uncased caddisfly",     tol: 10 },
  { id: "cased",      name: "Cased caddisfly",       tol: 10 },
  { id: "riffle",     name: "Riffle beetle",         tol: 10 },
  { id: "waterpenny", name: "Water penny",           tol: 10 },
  { id: "flatworm",   name: "Flat worm",             tol: 8  },
  { id: "damsel",     name: "Damselfly nymph",       tol: 8  },
  { id: "blackfly",   name: "Fly / black fly larvae",tol: 8  },
  { id: "beetle",     name: "Beetle larvae",         tol: 6  },
  { id: "snail",      name: "Snail",                 tol: 6  },
  { id: "shrimp",     name: "Shrimp / scud",         tol: 6  },
  { id: "leech",      name: "Leech",                 tol: 3  },
  { id: "segworm",    name: "Segmented worm",        tol: 2  }
] as const;

export type SpeciesId = (typeof SPECIES)[number]["id"];

export const ABIOTIC_FIELDS = [
  {
    key: "velocity",
    label: "Velocity",
    unit: "m/s",
    methodNote:
      "Hold a meter ruler in the water along the flow line. Drop a small piece of creamer (or a cork) at one end and video it from above. Time how long it takes to travel 1 m. velocity = distance / time. Repeat as needed."
  },
  {
    key: "width",
    label: "Width",
    unit: "cm",
    methodNote:
      "Measure horizontally where the water meets each bank. Three measurements along your site, use the mean. Hold the ruler taut and level."
  },
  {
    key: "depth",
    label: "Depth",
    unit: "cm",
    methodNote:
      "Hold the ruler vertical, just touching the streambed. Read where the waterline sits most of the time (ignore brief peaks from passing waves). Three readings across your site."
  },
  {
    key: "ph",
    label: "pH",
    unit: "",
    methodNote:
      "Place the probe in the middle of the water column (not the surface, not the bed). Wait for the reading to settle. Cross-check with a litmus paper strip if available."
  },
  {
    key: "temp",
    label: "Temp",
    unit: "°C",
    methodNote:
      "Hold the thermometer in the middle of the water column for 30 seconds. Read while the bulb is still in the water. If analogue, get your eye level with the meniscus."
  },
  {
    key: "nitrate",
    label: "Nitrate",
    unit: "ppm",
    methodNote:
      "Dip the test stick in the middle of the water column for 2 seconds. Do not swirl it. Lift out, hold flat, wait 1 minute, then compare the colour pads to the reference chart."
  }
] as const;

export type AbioticKey = (typeof ABIOTIC_FIELDS)[number]["key"];

export const MEADOW_LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
