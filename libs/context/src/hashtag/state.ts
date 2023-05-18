import { UseDisclosureReturn } from '@chakra-ui/react'
import { UseQueryResult } from '@tanstack/react-query'

import { RedisQuote } from '@wsvvrijheid/types'

import {
  HashtagActions,
  HashtagContextType,
  HashtagState,
  PostState,
} from './types'

export const initialPostState: PostState = {
  post: null,
  availableCount: 0,
  count: 0,
  defaultHashtags: [],
  isExceeded: false,
  sentences: [],
  mentionUsernames: [],
  postContent: '',
  sentence: '',
  threshold: 0,
  trendNames: [],
}

export const initialHashtagState: HashtagState = {
  activePostId: null,
  data: null,
  mentionSearchKey: '',
  posts: { 0: initialPostState },
  quotesQuery: {} as UseQueryResult<RedisQuote[]>,
  savedMentions: [],
  mentionsDisclosure: {} as UseDisclosureReturn,
  trendsDisclosure: {} as UseDisclosureReturn,
}

export const initialHashtagActions: HashtagActions = {
  addMentionToPost: () => null,
  addTrendToPost: () => null,
  removeMentionFromPost: () => null,
  removeStoredMention: () => null,
  removeTrendFromPost: () => null,
  setActivePostId: () => null,
  setMentionSearchKey: () => null,
  updatePostContent: () => null,
  updateStoredMentions: () => null,
}

export const initialHashtagContext: HashtagContextType = {
  ...initialHashtagState,
  ...initialHashtagActions,
}
