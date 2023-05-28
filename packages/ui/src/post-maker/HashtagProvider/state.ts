import { UseDisclosureReturn } from '@chakra-ui/react'

import { HashtagActions, HashtagContextType, HashtagState } from './types'

export const initialHashtagState: HashtagState = {
  activePostId: null,
  data: null,
  defaultTrends: {},
  mentionSearchKey: '',
  mentionsDisclosure: {} as UseDisclosureReturn,
  postMentions: {},
  postSentenceShares: {},
  postTrends: {},
  savedMentions: [],
  trendsDisclosure: {} as UseDisclosureReturn,
  hashtagSentences: {},
  hashtagStats: {
    totalSentences: 0,
    totalShares: 0,
    unsharedCount: 0,
  },
}

export const initialHashtagActions: HashtagActions = {
  addMentionToPost: () => null,
  addTrendToPost: () => null,
  removeDefaultTrendFromPost: () => null,
  removeMentionFromPost: () => null,
  removeStoredMention: () => null,
  removeTrendFromPost: () => null,
  setActivePostId: () => null,
  setMentionSearchKey: () => null,
  updatePostSentenceShares: () => null,
  updateStoredMentions: () => null,
}

export const initialHashtagContext: HashtagContextType = {
  ...initialHashtagState,
  ...initialHashtagActions,
}
