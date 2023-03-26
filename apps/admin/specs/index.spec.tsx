import { DehydratedState } from '@tanstack/react-query'
import { render } from '@testing-library/react'

import Index from '../pages/index'

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Index seo={{}} dehydratedState={{} as DehydratedState} />,
    )
    expect(baseElement).toBeTruthy()
  })
})
