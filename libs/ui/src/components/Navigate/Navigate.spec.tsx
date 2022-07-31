import { render } from '@testing-library/react'

import { Navigate } from './Navigate'

describe('Navigate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Navigate />)
    expect(baseElement).toBeTruthy()
  })
})
