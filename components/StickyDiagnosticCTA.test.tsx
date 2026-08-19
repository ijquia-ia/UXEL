import { act, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { StickyDiagnosticCTA } from './StickyDiagnosticCTA'

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void

class ControlledIntersectionObserver {
  static instances: ControlledIntersectionObserver[] = []
  readonly disconnect = vi.fn()

  constructor(readonly callback: ObserverCallback) {
    ControlledIntersectionObserver.instances.push(this)
  }

  observe = vi.fn()
  unobserve = vi.fn()
}

afterEach(() => {
  ControlledIntersectionObserver.instances = []
  vi.unstubAllGlobals()
})

describe('StickyDiagnosticCTA', () => {
  it('appears after the diagnostic section and hides when contact is visible', () => {
    vi.stubGlobal('IntersectionObserver', ControlledIntersectionObserver)
    const { unmount } = render(<><section id="diagnostico" /><section id="contacto" /><StickyDiagnosticCTA /></>)

    expect(screen.queryByRole('link', { name: /agendar diagnóstico estratégico/i })).not.toBeInTheDocument()

    act(() => {
      ControlledIntersectionObserver.instances[0].callback([{ isIntersecting: true } as IntersectionObserverEntry])
    })
    expect(screen.getByRole('link', { name: /agendar diagnóstico estratégico/i })).toHaveAttribute('href', '#contacto')

    act(() => {
      ControlledIntersectionObserver.instances[1].callback([{ isIntersecting: true } as IntersectionObserverEntry])
    })
    expect(screen.queryByRole('link', { name: /agendar diagnóstico estratégico/i })).not.toBeInTheDocument()

    unmount()
    expect(ControlledIntersectionObserver.instances[0].disconnect).toHaveBeenCalledOnce()
    expect(ControlledIntersectionObserver.instances[1].disconnect).toHaveBeenCalledOnce()
  })
})
