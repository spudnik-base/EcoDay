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
  { key: "velocity", label: "Velocity", unit: "m/s" },
  { key: "width",    label: "Width",    unit: "cm"  },
  { key: "depth",    label: "Depth",    unit: "cm"  },
  { key: "ph",       label: "pH",       unit: ""    },
  { key: "temp",     label: "Temp",     unit: "°C" },
  { key: "nitrate",  label: "Nitrate",  unit: "ppm" }
] as const;

export type AbioticKey = (typeof ABIOTIC_FIELDS)[number]["key"];

export const MEADOW_LABELS = "ABCDEFGHIJKLMNOP".split("");
