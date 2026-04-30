// Decoupage Dents du Midi.
// Four cut-paper layers, polygonal silhouettes only (no curves). Each layer is
// a distinct paper tone, offset slightly down so you see the cut edge of the
// layer in front. A 1px lighter line traces each silhouette to suggest the
// chamfered edge of cut paper.
type Props = {
  // wide=true uses a 900x80 viewbox for the dashboard, false uses 380x80
  wide?: boolean;
};

type Pt = [number, number];

function poly(pts: Pt[], W: number, H: number): string {
  return pts.map(([x, y]) => `${(x / 380) * W},${(y / 80) * H}`).join(" ");
}

function topEdge(pts: Pt[], W: number, H: number): string {
  // strip the two baseline corners (first and last) so we draw only the silhouette
  const inner = pts.slice(1, -1);
  return inner.map(([x, y]) => `${(x / 380) * W},${(y / 80) * H}`).join(" ");
}

export default function Mountains({ wide = false }: Props) {
  const W = wide ? 900 : 380;
  const H = 80;

  // Layer 1: furthest, low rolling hills.
  const layer1: Pt[] = [
    [0, 80], [0, 70],
    [30, 64], [60, 68], [95, 58], [130, 64],
    [170, 54], [205, 60], [240, 50], [275, 56],
    [310, 48], [345, 54], [380, 46],
    [380, 80]
  ];

  // Layer 2: mid-far ridges.
  const layer2: Pt[] = [
    [0, 80], [0, 64],
    [22, 58], [45, 62], [70, 50], [95, 56],
    [120, 44], [148, 50], [175, 38], [200, 46],
    [228, 34], [256, 42], [285, 30], [312, 38],
    [340, 28], [368, 36], [380, 32],
    [380, 80]
  ];

  // Layer 3: mid-near, pronounced angular peaks.
  const layer3: Pt[] = [
    [0, 80], [0, 58],
    [18, 50], [40, 60], [62, 38], [80, 52],
    [100, 28], [120, 44], [142, 22], [165, 40],
    [188, 18], [212, 36], [238, 16], [262, 34],
    [288, 14], [314, 32], [340, 12], [365, 30],
    [380, 26],
    [380, 80]
  ];

  // Layer 4: foreground, the canonical 7-peak Dents du Midi profile.
  // x positions chosen so peaks fall roughly evenly across the band.
  const layer4: Pt[] = [
    [0, 80], [0, 60],
    [14, 54],
    [38, 28],   // Cime de l'Est
    [60, 46],
    [82, 18],   // Forteresse
    [104, 38],
    [128, 12],  // Cathedrale
    [152, 32],
    [176, 8],   // Eperon
    [200, 26],
    [224, 6],   // Dent Jaune
    [250, 22],
    [276, 4],   // Doigts
    [304, 20],
    [332, 2],   // Haute Cime (tallest)
    [358, 24],
    [380, 38],
    [380, 80]
  ];

  // Distinct paper tones, cooler/darker as we move forward (closer = more ink).
  const tones = ["#3F4A6A", "#2F3957", "#222D4A", "#141E3A"];
  // Highlight along the cut edge of each layer.
  const edge  = ["#5A6582", "#4A5572", "#3A4565", "#2A3550"];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      style={{ width: "100%", display: "block" }}
      aria-hidden
    >
      <polygon points={poly(layer1, W, H)} fill={tones[0]} />
      <polyline
        points={topEdge(layer1, W, H)}
        fill="none"
        stroke={edge[0]}
        strokeWidth="0.6"
        vectorEffect="non-scaling-stroke"
      />
      <polygon points={poly(layer2, W, H)} fill={tones[1]} />
      <polyline
        points={topEdge(layer2, W, H)}
        fill="none"
        stroke={edge[1]}
        strokeWidth="0.6"
        vectorEffect="non-scaling-stroke"
      />
      <polygon points={poly(layer3, W, H)} fill={tones[2]} />
      <polyline
        points={topEdge(layer3, W, H)}
        fill="none"
        stroke={edge[2]}
        strokeWidth="0.6"
        vectorEffect="non-scaling-stroke"
      />
      <polygon points={poly(layer4, W, H)} fill={tones[3]} />
      <polyline
        points={topEdge(layer4, W, H)}
        fill="none"
        stroke={edge[3]}
        strokeWidth="0.6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
