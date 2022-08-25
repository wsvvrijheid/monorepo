import { HashtagReturnType } from '@wsvvrijheid/utils'
import { sample } from 'lodash'
import { rest } from 'msw'

import { HASHTAG_MOCKS, POST_MOCKS } from '../../strapi'

export const getHashtagMock = rest.get<HashtagReturnType>(
  `${process.env['NX_API_URL']}/api/hashtags`,
  (req, res, ctx) => {
    const hashtag = sample(HASHTAG_MOCKS.data)

    const posts = POST_MOCKS.data

    return res(ctx.status(200), ctx.json({ data: [{ ...hashtag, posts }] }))
  },
)
