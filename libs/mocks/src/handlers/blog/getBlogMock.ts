import { API_URL } from '@wsvvrijheid/config'
import { Blog } from '@wsvvrijheid/types'
import { sample } from 'lodash'
import { rest } from 'msw'

import { BLOG_MOCKS } from '../../strapi/blog'

export const getBlogMock = rest.get<Blog>(
  `${API_URL}/api/blogs`,
  (req, res, ctx) => {
    const slug = req.url.searchParams.get('slug')
    if (slug) {
      // TODO Use dynamic locale from request
      const sampleMock = sample(BLOG_MOCKS.tr.data)
      if (!sampleMock) return res(ctx.status(200), ctx.json(null))

      return res(ctx.status(200), ctx.json(sampleMock))
    }
    return res(ctx.status(200), ctx.json(BLOG_MOCKS.tr.data))
  },
)
