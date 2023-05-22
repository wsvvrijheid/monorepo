import { ReactNode } from 'react'

import { UseDisclosureReturn } from '@chakra-ui/react'

import { HashtagReturnType, MentionUserData } from '@wsvvrijheid/types'

export type HashtagActions = {
  addMentionToPost: (postId: number, mention: string) => void
  addTrendToPost: (postId: number, trend: string) => void
  removeDefaultTrendFromPost: (postId: number, mention: string) => void
  removeMentionFromPost: (postId: number, mention: string) => void
  removeStoredMention: (mention: string) => void
  removeTrendFromPost: (postId: number, trend: string) => void
  setActivePostId: (postId: number) => void
  setMentionSearchKey: (key: string) => void
  updateStoredMentions: (mention: MentionUserData) => void
  updatePostSentenceShares: (postId: number, shares: number) => void
}

export type HashtagState = {
  activePostId: number | null
  data: HashtagReturnType | null
  defaultTrends: Record<number, string[]>
  mentionSearchKey: string
  mentionsDisclosure: UseDisclosureReturn
  postMentions: Record<number, string[]>
  postSentenceShares: Record<number, number>
  postTrends: Record<number, string[]>
  savedMentions: MentionUserData[]
  trendsDisclosure: UseDisclosureReturn
}

export type HashtagContextType = HashtagState & HashtagActions

export type HashtagProviderProps = {
  children: ReactNode
  hashtag: HashtagReturnType
}
