import { API_URL } from '@wsvvrijheid/config'
import { HashtagReturnType } from '@wsvvrijheid/utils'
import { sample } from 'lodash'
import { rest } from 'msw'

import { HASHTAG_MOCKS, POST_MOCKS } from '../../strapi'

export const getHashtagMock = rest.get<HashtagReturnType>(
  `${API_URL}/api/hashtags`,
  (req, res, ctx) => {
    const hashtag = sample(HASHTAG_MOCKS.tr.data)

    const posts = POST_MOCKS.tr.data

    return res(ctx.status(200), ctx.json({ data: [{ ...hashtag, posts }] }))
  },
)
