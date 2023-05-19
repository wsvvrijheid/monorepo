import { UseDisclosureReturn } from '@chakra-ui/react'

import { HashtagActions, HashtagContextType, HashtagState } from './types'

export const initialHashtagState: HashtagState = {
  activePostId: null,
  data: null,
  mentionSearchKey: '',
  savedMentions: [],
  mentionsDisclosure: {} as UseDisclosureReturn,
  trendsDisclosure: {} as UseDisclosureReturn,
  postTrends: {},
  postMentions: {},
}

export const initialHashtagActions: HashtagActions = {
  addMentionToPost: () => null,
  addTrendToPost: () => null,
  removeMentionFromPost: () => null,
  removeStoredMention: () => null,
  removeTrendFromPost: () => null,
  setActivePostId: () => null,
  setMentionSearchKey: () => null,
  updateStoredMentions: () => null,
}

export const initialHashtagContext: HashtagContextType = {
  ...initialHashtagState,
  ...initialHashtagActions,
}
