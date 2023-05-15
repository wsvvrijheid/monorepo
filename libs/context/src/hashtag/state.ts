import { UseDisclosureReturn } from '@chakra-ui/react'
import { UseQueryResult } from '@tanstack/react-query'

import { Trend } from '@wsvvrijheid/types'

import { HashtagContextType, RedisQuote } from './types'

export const initialHashtagState: HashtagContextType = {
  activePostId: null,
  data: null,
  mentionsDisclosure: {} as UseDisclosureReturn,
  posts: [],
  quotesQuery: {} as UseQueryResult<RedisQuote[]>,
  savedMentions: [],
  trendQuery: {} as UseQueryResult<Trend>,
  trendsDisclosure: {} as UseDisclosureReturn,
  addMentionToPost: () => null,
  addTrendToPost: () => null,
  removeMentionFromPost: () => null,
  removeStoredMention: () => null,
  removeTrendFromPost: () => null,
  setActivePostId: () => null,
  setPostText: () => null,
  updateStoredMentions: () => null,
}
