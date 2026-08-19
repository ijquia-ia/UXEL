import { describe, expect, it } from 'vitest'

describe('test harness', () => {
  it('provides an IntersectionObserver mock', () => {
    const observer = new IntersectionObserver(() => {})

    expect(typeof observer.observe).toBe('function')
    expect(typeof observer.unobserve).toBe('function')
    expect(typeof observer.disconnect).toBe('function')
  })
})
