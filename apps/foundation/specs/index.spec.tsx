import React from 'react'

import { render } from '@testing-library/react'

import Index from '../pages/index'

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index platforms={{ data: [], meta: {} }} />)
    expect(baseElement).toBeTruthy()
  })
})
