import { Blog } from '@wsvvrijheid/types'
import { rest } from 'msw'

import { BLOG_MOCKS } from '../../strapi/blog'

export const getBlogMock = rest.get<Blog>(
  `https://api.samenvvv.nl/api/blogs`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(BLOG_MOCKS))
  },
)
