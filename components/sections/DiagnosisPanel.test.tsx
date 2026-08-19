import { render, screen } from '@testing-library/react'
import React from 'react'
import { expect, it } from 'vitest'

import { DiagnosisPanel } from './DiagnosisPanel'

it('communicates the outputs of a diagnosis', () => {
  render(<DiagnosisPanel />)

  expect(screen.getByRole('heading', { name: /evaluador de fricción operacional/i })).toBeInTheDocument()
  expect(screen.getByText(/00 \/ diagnóstico inteligente express/i)).toBeInTheDocument()
})
