import { Hashtag } from '@wsvvrijheid/types'
import { sample } from 'lodash'
import { rest } from 'msw'

import { HASHTAG_MOCKS } from '../../strapi'

export const getHashtagMock = rest.get<Hashtag>(
  `https://api.samenvvv.nl/api/hashtags`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: [HASHTAG_MOCKS.data[0]] }))
  },
)
