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
}

export type HashtagState = {
  activePostId: number | null
  data: HashtagReturnType | null
  mentionSearchKey: string
  mentionsDisclosure: UseDisclosureReturn
  savedMentions: MentionUserData[]
  trendsDisclosure: UseDisclosureReturn
  defaultTrends: Record<number, string[]>
  postTrends: Record<number, string[]>
  postMentions: Record<number, string[]>
}

export type HashtagContextType = HashtagState & HashtagActions

export type HashtagProviderProps = {
  children: ReactNode
  hashtag: HashtagReturnType
}
