# Sistema vivo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the UXEL landing into an accessible, premium “living system” experience that converts visitors to a strategic diagnostic.

**Architecture:** Keep the server-rendered page as composition and isolate browser-only animation in `SignalMap`. Use an SVG with a deterministic local signal graph, CSS/Framer Motion for progressive enhancement, and a static equivalent for reduced motion. Reuse the present section components while adding focused diagnostic, proof, and sticky-CTA components.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Vitest + Testing Library.

---

## File structure

- Create `components/system/signal-data.ts`: typed local nodes, links, routes, and layout coordinates; no React or browser dependency.
- Create `components/system/SignalMap.tsx`: responsive SVG presentation, reduced-motion fallback, and intersection-controlled animation.
- Create `components/sections/DiagnosisPanel.tsx`: static, accessible explanation of problem, impact, and next step.
- Create `components/sections/ProofOfCapability.tsx`: evidence cards that link to the existing demos.
- Create `components/StickyDiagnosticCTA.tsx`: client-only CTA that appears after the hero and hides at contact.
- Modify `components/sections/Hero.tsx`: compose `SignalMap`, simplify its animation ownership, and preserve both CTAs.
- Modify `components/sections/Services.tsx`: connect each service to a route outcome.
- Modify `components/sections/CaseStudies.tsx`: retire duplicated presentation in favor of `ProofOfCapability`.
- Modify `components/SmoothScroll.tsx`: honor reduced-motion and clean up the RAF loop.
- Modify `app/page.tsx`: compose the new sections and sticky CTA in intended scroll order.
- Modify `app/globals.css`: tokens, static-map styles, and motion-reduction rules.
- Create `vitest.config.ts`, `tests/setup.ts`, and focused component/data tests.
- Modify `package.json`: add test scripts and test-only development dependencies.

### Task 1: Add the test harness

**Files:**
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Modify: `package.json`

- [ ] **Step 1: Add the test dependencies and scripts**

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "jsdom": "^25.0.1",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 2: Create the Vitest configuration**

```ts
import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    passWithNoTests: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
```

- [ ] **Step 3: Create the shared test setup**

```ts
import '@testing-library/jest-dom/vitest'

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
})
```

- [ ] **Step 4: Install dependencies and validate the empty harness**

Run: `npm install && npm run test`

Expected: Vitest exits successfully because `passWithNoTests: true` is set in the configuration.

- [ ] **Step 5: Commit the harness**

```bash
git add package.json package-lock.json vitest.config.ts tests/setup.ts
git commit -m "test: add component test harness"
```

### Task 2: Define the signal-system model

**Files:**
- Create: `components/system/signal-data.ts`
- Create: `components/system/signal-data.test.ts`

- [ ] **Step 1: Write the failing data-contract test**

```ts
import { signalLinks, signalNodes, serviceRoutes } from './signal-data'

describe('signal system data', () => {
  it('connects every link to defined nodes and exposes three service routes', () => {
    const ids = new Set(signalNodes.map((node) => node.id))
    expect(signalLinks.every((link) => ids.has(link.from) && ids.has(link.to))).toBe(true)
    expect(serviceRoutes).toHaveLength(3)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- components/system/signal-data.test.ts`

Expected: FAIL because `signal-data.ts` does not exist.

- [ ] **Step 3: Implement the typed, local graph**

```ts
export type SignalNode = {
  id: 'ventas' | 'operacion' | 'clientes' | 'sistemas' | 'prioridad'
  label: string
  x: number
  y: number
  tone: 'muted' | 'cyan' | 'emerald'
}

export type SignalLink = { from: SignalNode['id']; to: SignalNode['id'] }

export const signalNodes: SignalNode[] = [
  { id: 'ventas', label: 'VENTAS', x: 16, y: 26, tone: 'muted' },
  { id: 'operacion', label: 'OPERACIÓN', x: 26, y: 73, tone: 'muted' },
  { id: 'clientes', label: 'CX', x: 62, y: 20, tone: 'emerald' },
  { id: 'sistemas', label: 'SISTEMAS', x: 74, y: 70, tone: 'cyan' },
  { id: 'prioridad', label: 'PRIORIDAD', x: 49, y: 47, tone: 'cyan' },
]

export const signalLinks: SignalLink[] = [
  { from: 'ventas', to: 'prioridad' },
  { from: 'operacion', to: 'prioridad' },
  { from: 'clientes', to: 'prioridad' },
  { from: 'sistemas', to: 'prioridad' },
]

export const serviceRoutes = [
  { number: '01', label: 'SOFTWARE', outcome: 'Procesos que responden a la operación.' },
  { number: '02', label: 'MARCA B2B', outcome: 'Una propuesta que se entiende y se recuerda.' },
  { number: '03', label: 'CX', outcome: 'Experiencias que eliminan fricción.' },
] as const
```

- [ ] **Step 4: Run the contract test**

Run: `npm run test -- components/system/signal-data.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the signal data**

```bash
git add components/system/signal-data.ts components/system/signal-data.test.ts
git commit -m "feat: define UXEL signal system data"
```

### Task 3: Build the accessible signal map

**Files:**
- Create: `components/system/SignalMap.tsx`
- Create: `components/system/SignalMap.test.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Write the failing component tests**

```tsx
import { render, screen } from '@testing-library/react'
import { SignalMap } from './SignalMap'

describe('SignalMap', () => {
  it('describes the visual system for assistive technology', () => {
    render(<SignalMap />)
    expect(screen.getByRole('img', { name: /señales de negocio convergen/i })).toBeInTheDocument()
  })

  it('renders every local signal label', () => {
    render(<SignalMap />)
    expect(screen.getByText('VENTAS')).toBeInTheDocument()
    expect(screen.getByText('PRIORIDAD')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- components/system/SignalMap.test.tsx`

Expected: FAIL because `SignalMap` does not exist.

- [ ] **Step 3: Implement the map as a client SVG component**

Use `useReducedMotion` from Framer Motion, `useInView` with `once: false`, and the graph from `signal-data.ts`. Render links as `<line>` elements and nodes as `<g>` groups positioned with percentage coordinates in a `viewBox="0 0 100 100"`. Give the SVG `role="img"` and `aria-label="Señales de negocio convergen en una prioridad de diagnóstico"`. Animate only decorative line opacity/dash offset when motion is allowed and the map is in view. Keep labels as visible SVG `<text>` nodes and render a short static caption below the SVG.

- [ ] **Step 4: Add the supporting CSS**

```css
.signal-map-grid { background-image: radial-gradient(rgb(0 229 255 / .22) 1px, transparent 1px); background-size: 20px 20px; }
.signal-link { stroke: rgb(15 23 42 / .24); stroke-width: .35; }
.signal-node-muted { fill: rgb(15 23 42 / .50); }
.signal-node-cyan { fill: var(--color-accent-cyan); }
.signal-node-emerald { fill: var(--color-accent-emerald); }
@media (prefers-reduced-motion: reduce) { .signal-map-motion { animation: none !important; transition: none !important; } }
```

- [ ] **Step 5: Run focused tests and production build**

Run: `npm run test -- components/system/SignalMap.test.tsx && npm run build`

Expected: tests PASS and Next.js completes its production build.

- [ ] **Step 6: Commit the map**

```bash
git add components/system/SignalMap.tsx components/system/SignalMap.test.tsx app/globals.css
git commit -m "feat: add accessible animated signal map"
```

### Task 4: Compose the new hero and diagnosis panel

**Files:**
- Modify: `components/sections/Hero.tsx`
- Create: `components/sections/DiagnosisPanel.tsx`
- Create: `components/sections/DiagnosisPanel.test.tsx`

- [ ] **Step 1: Write the failing diagnosis-panel test**

```tsx
import { render, screen } from '@testing-library/react'
import { DiagnosisPanel } from './DiagnosisPanel'

it('communicates the three diagnostic outputs', () => {
  render(<DiagnosisPanel />)
  expect(screen.getByRole('heading', { name: /del ruido a una decisión/i })).toBeInTheDocument()
  expect(screen.getByText('PROBLEMA')).toBeInTheDocument()
  expect(screen.getByText('IMPACTO')).toBeInTheDocument()
  expect(screen.getByText('SIGUIENTE PASO')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm run test -- components/sections/DiagnosisPanel.test.tsx`

Expected: FAIL because `DiagnosisPanel` does not exist.

- [ ] **Step 3: Implement `DiagnosisPanel`**

Render a section with `id="diagnostico"`, eyebrow `00 / DIAGNÓSTICO`, heading `Del ruido a una decisión útil.` and three semantic `<article>` elements labelled `PROBLEMA`, `IMPACTO`, and `SIGUIENTE PASO`. Use static copy that explains the diagnostic outcome without claims of real-time analysis.

- [ ] **Step 4: Update `Hero`**

Replace the current right-side GSAP/parallax panel and decorative background with `<SignalMap />`. Retain the page heading, description, `#contacto` CTA, and `#casos` link. Remove GSAP and `ScrollTrigger` imports and effects from this file so `SignalMap` owns visual behavior.

- [ ] **Step 5: Run the test and build**

Run: `npm run test -- components/sections/DiagnosisPanel.test.tsx && npm run build`

Expected: PASS and successful build.

- [ ] **Step 6: Commit this route**

```bash
git add components/sections/Hero.tsx components/sections/DiagnosisPanel.tsx components/sections/DiagnosisPanel.test.tsx
git commit -m "feat: introduce diagnostic narrative"
```

### Task 5: Connect services and proof to the system narrative

**Files:**
- Modify: `components/sections/Services.tsx`
- Modify: `components/sections/CaseStudies.tsx`
- Create: `components/sections/ProofOfCapability.tsx`
- Create: `components/sections/ProofOfCapability.test.tsx`

- [ ] **Step 1: Write the failing proof test**

```tsx
import { render, screen } from '@testing-library/react'
import { ProofOfCapability } from './ProofOfCapability'

it('links visitors to both working demos', () => {
  render(<ProofOfCapability />)
  expect(screen.getByRole('link', { name: /explorar triage cx/i })).toHaveAttribute('href', '/demos/triage-cx')
  expect(screen.getByRole('link', { name: /explorar calificador de leads/i })).toHaveAttribute('href', '/demos/calificador-leads')
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm run test -- components/sections/ProofOfCapability.test.tsx`

Expected: FAIL because `ProofOfCapability` does not exist.

- [ ] **Step 3: Implement the proof section**

Create `ProofOfCapability` as a server component with `id="casos"`, an explicit `CASOS ILUSTRATIVOS` disclosure, and two accessible links named `Explorar Triage CX` and `Explorar Calificador de leads`. Preserve the existing illustrative claims exactly and do not imply these are client results.

- [ ] **Step 4: Refine services**

Import `serviceRoutes` from `components/system/signal-data.ts`, pair each service with its matching `outcome`, and display that outcome above service tags as a concise business-result line. Leave service interactions and their current responsive grid intact.

- [ ] **Step 5: Replace legacy case composition**

Remove `CaseStudies` from `app/page.tsx` after adding `ProofOfCapability`; delete `components/sections/CaseStudies.tsx` only once `rg "CaseStudies"` finds no imports. If it remains, retain it unused until a later cleanup commit.

- [ ] **Step 6: Run tests and build**

Run: `npm run test -- components/sections/ProofOfCapability.test.tsx && npm run build`

Expected: PASS and build succeeds.

- [ ] **Step 7: Commit the evidence route**

```bash
git add components/sections/Services.tsx components/sections/ProofOfCapability.tsx components/sections/ProofOfCapability.test.tsx app/page.tsx
git commit -m "feat: frame demos as proof of capability"
```

### Task 6: Add the sticky diagnostic CTA and motion-safe smooth scrolling

**Files:**
- Create: `components/StickyDiagnosticCTA.tsx`
- Create: `components/StickyDiagnosticCTA.test.tsx`
- Modify: `components/SmoothScroll.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write the failing CTA test**

```tsx
import { render, screen } from '@testing-library/react'
import { StickyDiagnosticCTA } from './StickyDiagnosticCTA'

it('offers a direct path to the contact section', () => {
  render(<StickyDiagnosticCTA />)
  expect(screen.getByRole('link', { name: /agendar diagnóstico/i })).toHaveAttribute('href', '#contacto')
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm run test -- components/StickyDiagnosticCTA.test.tsx`

Expected: FAIL because `StickyDiagnosticCTA` does not exist.

- [ ] **Step 3: Implement the sticky CTA**

Use two `IntersectionObserver`s: observe `#diagnostico` to show the CTA after the hero and observe `#contacto` to hide it while contact is visible. Render nothing until the component is mounted; then render a fixed, keyboard-focusable `<a href="#contacto">Agendar diagnóstico <ArrowUpRight /></a>` with a clear `aria-label` and mobile-safe bottom spacing.

- [ ] **Step 4: Make smooth scroll respect user motion preferences**

In `SmoothScroll`, check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before constructing Lenis. If true, return without creating a RAF loop; otherwise retain the existing cleanup of the animation frame and `lenis.destroy()`.

- [ ] **Step 5: Add CTA to page composition**

Import and render `StickyDiagnosticCTA` after `Navbar` in `app/page.tsx`. Render `DiagnosisPanel` directly after `Hero`, `ProofOfCapability` after `Services`, and preserve `Process`, `About`, `FAQ`, and `Contact` after them.

- [ ] **Step 6: Run focused test and build**

Run: `npm run test -- components/StickyDiagnosticCTA.test.tsx && npm run build`

Expected: PASS and successful build.

- [ ] **Step 7: Commit the conversion and preference behavior**

```bash
git add components/StickyDiagnosticCTA.tsx components/StickyDiagnosticCTA.test.tsx components/SmoothScroll.tsx app/page.tsx
git commit -m "feat: add persistent diagnostic conversion path"
```

### Task 7: Validate the complete experience

**Files:**
- Modify: `app/globals.css` only if validation reveals a specific visual, contrast, or layout defect.

- [ ] **Step 1: Run the full automated suite**

Run: `npm run test && npm run build`

Expected: every component test passes and Next.js emits a successful production build.

- [ ] **Step 2: Run the application locally**

Run: `npm run dev`

Expected: Next.js serves the landing at `http://localhost:3000`.

- [ ] **Step 3: Perform manual desktop validation**

Check that the map appears in the hero, both CTAs work, the sticky CTA appears after the hero and hides at contact, existing demo links resolve, and no case is described as a real client.

- [ ] **Step 4: Perform manual mobile and accessibility validation**

At a 375px viewport, check header, hero, map labels, CTA, services, contact form, and no horizontal scroll. With keyboard only, reach every interactive control and confirm visible focus. Emulate `prefers-reduced-motion: reduce` and confirm the map remains understandable with no continuous motion and Lenis disabled.

- [ ] **Step 5: Commit validation fixes, if any**

```bash
git add app/globals.css components app package.json package-lock.json
git commit -m "fix: polish sistema vivo experience"
```
