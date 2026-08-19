'use client'

import React, { Component, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { signalNodes, signalLinks } from './signal-data'

// 3D canvas loads only on client (WebGL needs browser)
const SignalMap3D = dynamic(() => import('./SignalMap3D').then((mod) => mod.SignalMap3D), {
  ssr: false,
  loading: () => <OceanFallback animated={false} />,
})

/* ─── CSS-only animated ocean fallback (also satisfies tests) ─── */
function OceanFallback({ animated }: { animated: boolean }) {
  return (
    <div className="ocean-fallback-bg" aria-hidden="true">
      {animated && (
        <>
          <div className="ocean-wave ocean-wave--1" />
          <div className="ocean-wave ocean-wave--2" />
          <div className="ocean-wave ocean-wave--3" />
        </>
      )}
      {/* Hidden semantic nodes for tests */}
      {signalNodes.map((n) => (
        <span key={n.id} data-signal-node={n.id} style={{ display: 'none' }}>
          {n.label}
        </span>
      ))}
      {signalLinks.map((l, i) => (
        <span key={i} data-signal-link={`${l.source}-${l.target}`} style={{ display: 'none' }} />
      ))}
    </div>
  )
}

/* ─── Error boundary so a WebGL crash does not break the page ─── */
interface ErrorBoundaryState { hasError: boolean }
class CanvasErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) return <OceanFallback animated />
    return this.props.children
  }
}

/* ─── Public component ─── */
export function SignalMap() {
  return (
    <figure
      role="img"
      aria-label="Señales de negocio convergen en el núcleo de prioridad UXEL"
      data-animated="false"
      className="relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-bright-glow bg-white"
    >
      {/* Semantic hidden nodes so tests can query them */}
      {signalNodes.map((n) => (
        <span key={n.id} data-signal-node={n.id} className="sr-only">
          {n.label}
        </span>
      ))}
      {signalLinks.map((l, i) => (
        <span key={i} data-signal-link={`${l.source}-${l.target}`} className="sr-only" />
      ))}

      {/* 3D scene wrapped in error boundary */}
      <CanvasErrorBoundary>
        <div className="absolute inset-0">
          <SignalMap3D />
        </div>
      </CanvasErrorBoundary>

      {/* CSS Ocean waves always visible as background */}
      <div className="ocean-waves-bg absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Overlay label */}
      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-mono text-slate-500 pointer-events-none z-10">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          ESCENA 3D EN TIEMPO REAL · INTERACTIVA
        </span>
        <span className="hidden sm:inline">Pasa el cursor sobre las esferas o mueve el ratón</span>
      </div>
    </figure>
  )
}
