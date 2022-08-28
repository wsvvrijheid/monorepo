import { API_URL } from '@wsvvrijheid/config'
import { Art } from '@wsvvrijheid/types'
import { rest } from 'msw'

import { ART_MOCKS } from '../../strapi'

export const getArtMock = rest.get<Art>(
  `${API_URL}/api/arts`,
  (req, res, ctx) => {
    const slug = req.url.searchParams.get('slug')

    if (slug) {
      const art = ART_MOCKS.tr.data.find(mock => mock.slug === slug)
      return res(ctx.status(200), ctx.json({ data: [art], meta: {} }))
    }

    return res(ctx.status(200), ctx.json({ data: ART_MOCKS }))
  },
)
