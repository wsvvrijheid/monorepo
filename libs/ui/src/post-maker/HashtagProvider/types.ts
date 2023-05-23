import { ReactNode } from 'react'

import { UseDisclosureReturn } from '@chakra-ui/react'

import { HashtagReturnType, MentionUserData } from '@wsvvrijheid/types'

export type HashtagStats = {
  unsharedCount: number
  totalSentences: number
  totalShares: number
}

export type PostStats = HashtagStats & {
  leastShareCount: number
}

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
  updatePostSentenceShares: (args: { postId: number } & PostStats) => void
}

export type HashtagState = {
  activePostId: number | null
  data: HashtagReturnType | null
  defaultTrends: Record<number, string[]>
  mentionSearchKey: string
  mentionsDisclosure: UseDisclosureReturn
  postMentions: Record<number, string[]>
  postSentenceShares: Record<number, PostStats>
  postTrends: Record<number, string[]>
  savedMentions: MentionUserData[]
  hashtagStats: HashtagStats
  trendsDisclosure: UseDisclosureReturn
}

export type HashtagContextType = HashtagState & HashtagActions

export type HashtagProviderProps = {
  children: ReactNode
  hashtag: HashtagReturnType
}
