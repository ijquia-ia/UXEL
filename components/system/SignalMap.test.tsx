import { act, render, screen, within } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

const motionState = vi.hoisted(() => ({ reduced: false }))

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>()
  return { ...actual, useReducedMotion: () => motionState.reduced }
})

// Mock next/dynamic so the 3D canvas is not loaded in tests (no WebGL in jsdom)
vi.mock('next/dynamic', () => ({
  default: () => () => null,
}))

import { signalLinks, signalNodes } from './signal-data'
import { SignalMap } from './SignalMap'

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
  motionState.reduced = false
  ControlledIntersectionObserver.instances = []
  vi.unstubAllGlobals()
})

describe('SignalMap', () => {
  it('renders an accessible business-signal map with visible labels', () => {
    render(<SignalMap />)

    const map = screen.getByRole('img', { name: /señales de negocio convergen/i })

    expect(within(map).getByText('VENTAS')).toBeDefined()
    expect(within(map).getByText('PRIORIDAD')).toBeDefined()
  })

  it('renders every deterministic signal node and link', () => {
    const { container } = render(<SignalMap />)

    expect(container.querySelectorAll('[data-signal-node]')).toHaveLength(signalNodes.length)
    expect(container.querySelectorAll('[data-signal-link]')).toHaveLength(signalLinks.length)
  })

  it('renders the figure wrapper with correct aria attributes', () => {
    const { container } = render(<SignalMap />)
    const figure = container.querySelector('figure')

    expect(figure).toBeTruthy()
    expect(figure?.getAttribute('role')).toBe('img')
    expect(figure?.getAttribute('aria-label')).toMatch(/señales de negocio convergen/i)
  })

  it('contains all signal node labels in the accessible tree', () => {
    render(<SignalMap />)

    for (const node of signalNodes) {
      const el = screen.getByText(node.label)
      expect(el).toBeDefined()
    }
  })
})
