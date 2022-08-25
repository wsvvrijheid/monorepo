import { Art } from '@wsvvrijheid/types'
import { rest } from 'msw'

import { ART_MOCKS } from '../../strapi'

export const getArtMock = rest.get<Art>(
  `${process.env['NX_API_URL']}/api/arts`,
  (req, res, ctx) => {
    const slug = req.url.searchParams.get('slug')

    if (slug) {
      const art = ART_MOCKS.data.find(mock => mock.slug === slug)
      return res(ctx.status(200), ctx.json({ data: [art], meta: {} }))
    }

    return res(ctx.status(200), ctx.json({ data: ART_MOCKS }))
  },
)
