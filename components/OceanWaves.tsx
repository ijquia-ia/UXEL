'use client'

/**
 * OceanWaves — SVG multi-layer organic ocean waves.
 *
 * Design goals:
 *  - Realistic: each wave is a sum of MULTIPLE sine frequencies (Fourier-style),
 *    making the silhouette organic and never perfectly symmetric.
 *  - Parallax: front layer moves fastest, back layer slowest (depth illusion).
 *  - Visible: generous opacity and amplitude for a premium look.
 *  - Dark-mode aware via CSS class overrides.
 */
export function OceanWaves({ height = 240 }: { height?: number }) {
  const W = 1440 // viewBox width

  /**
   * Build an organic wave path by summing 4 sine components.
   * @param yBase     baseline Y position (0 = top)
   * @param waves     array of { amp, freq, phase } components to sum
   */
  const makePath = (
    yBase: number,
    waves: { amp: number; freq: number; phase: number }[]
  ) => {
    const step = 4
    const points: [number, number][] = []

    for (let x = 0; x <= W; x += step) {
      const t = x / W
      let dy = 0
      for (const w of waves) {
        dy += w.amp * Math.sin(t * Math.PI * 2 * w.freq + w.phase)
      }
      points.push([x, yBase + dy])
    }

    const polyline = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(2)}`).join(' ')
    return `M0,${height} L0,${points[0][1].toFixed(2)} L${polyline} L${W},${height} Z`
  }

  // ----- Layer definitions (front → back) -----
  const H = height

  // Layer 1 — front, tall amplitude, fast movement
  const path1a = makePath(H * 0.42, [
    { amp: 28, freq: 1.8, phase: 0 },
    { amp: 14, freq: 3.3, phase: 1.1 },
    { amp:  8, freq: 5.7, phase: 2.4 },
    { amp:  5, freq: 0.9, phase: 0.7 },
  ])
  const path1b = makePath(H * 0.42, [
    { amp: 28, freq: 1.8, phase: Math.PI },
    { amp: 14, freq: 3.3, phase: 1.1 + Math.PI },
    { amp:  8, freq: 5.7, phase: 2.4 + Math.PI },
    { amp:  5, freq: 0.9, phase: 0.7 + Math.PI },
  ])

  // Layer 2 — middle, moderate amplitude, medium movement
  const path2a = makePath(H * 0.55, [
    { amp: 22, freq: 2.1, phase: 0.8 },
    { amp: 11, freq: 4.2, phase: 2.0 },
    { amp:  7, freq: 6.1, phase: 3.7 },
    { amp:  4, freq: 1.1, phase: 1.5 },
  ])
  const path2b = makePath(H * 0.55, [
    { amp: 22, freq: 2.1, phase: 0.8 + Math.PI },
    { amp: 11, freq: 4.2, phase: 2.0 + Math.PI },
    { amp:  7, freq: 6.1, phase: 3.7 + Math.PI },
    { amp:  4, freq: 1.1, phase: 1.5 + Math.PI },
  ])

  // Layer 3 — back, lower amplitude, slow movement
  const path3a = makePath(H * 0.70, [
    { amp: 16, freq: 1.4, phase: 1.7 },
    { amp:  9, freq: 2.8, phase: 0.3 },
    { amp:  5, freq: 7.0, phase: 2.9 },
    { amp:  3, freq: 0.7, phase: 4.1 },
  ])
  const path3b = makePath(H * 0.70, [
    { amp: 16, freq: 1.4, phase: 1.7 + Math.PI },
    { amp:  9, freq: 2.8, phase: 0.3 + Math.PI },
    { amp:  5, freq: 7.0, phase: 2.9 + Math.PI },
    { amp:  3, freq: 0.7, phase: 4.1 + Math.PI },
  ])

  // Layer 4 — deepest, very gentle, barely moves
  const path4a = makePath(H * 0.82, [
    { amp: 10, freq: 1.0, phase: 3.2 },
    { amp:  6, freq: 2.3, phase: 1.9 },
    { amp:  3, freq: 5.5, phase: 0.5 },
  ])
  const path4b = makePath(H * 0.82, [
    { amp: 10, freq: 1.0, phase: 3.2 + Math.PI },
    { amp:  6, freq: 2.3, phase: 1.9 + Math.PI },
    { amp:  3, freq: 5.5, phase: 0.5 + Math.PI },
  ])

  return (
    <div className="waves-wrapper" style={{ height }}>
      {/* Layer 4 — deepest / slowest */}
      <svg
        className="wave-svg wave-layer-4"
        viewBox={`0 0 ${W * 2} ${H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="wave-fill-4" d={path4a} />
        <g transform={`translate(${W}, 0)`}>
          <path className="wave-fill-4" d={path4b} />
        </g>
      </svg>

      {/* Layer 3 — deep */}
      <svg
        className="wave-svg wave-layer-3"
        viewBox={`0 0 ${W * 2} ${H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="wave-fill-3" d={path3a} />
        <g transform={`translate(${W}, 0)`}>
          <path className="wave-fill-3" d={path3b} />
        </g>
      </svg>

      {/* Layer 2 — mid */}
      <svg
        className="wave-svg wave-layer-2"
        viewBox={`0 0 ${W * 2} ${H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="wave-fill-2" d={path2a} />
        <g transform={`translate(${W}, 0)`}>
          <path className="wave-fill-2" d={path2b} />
        </g>
      </svg>

      {/* Layer 1 — front / most opaque */}
      <svg
        className="wave-svg wave-layer-1"
        viewBox={`0 0 ${W * 2} ${H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="wave-fill-1" d={path1a} />
        <g transform={`translate(${W}, 0)`}>
          <path className="wave-fill-1" d={path1b} />
        </g>
      </svg>
    </div>
  )
}
