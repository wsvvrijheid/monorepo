import { ReactNode } from 'react'

import { UseDisclosureReturn } from '@chakra-ui/react'
import { UseQueryResult } from '@tanstack/react-query'

import {
  Hashtag,
  MentionUserData,
  Post,
  RedisPost,
  RedisQuote,
} from '@wsvvrijheid/types'

export type PostState = {
  availableCount: number
  count: number
  defaultHashtags: string[]
  isExceeded: boolean
  mentionUsernames: string[]
  post: Post | null
  postContent: string
  sentence: string
  sentences: RedisPost[]
  threshold: number
  trendNames: string[]
}

export type HashtagActions = {
  addMentionToPost: (postId: number, mention: string) => void
  addTrendToPost: (postId: number, trend: string) => void
  removeMentionFromPost: (postId: number, mention: string) => void
  removeStoredMention: (mention: string) => void
  removeTrendFromPost: (postId: number, trend: string) => void
  setActivePostId: (postId: number) => void
  setMentionSearchKey: (key: string) => void
  updatePostContent: (postId: number, state: Partial<PostState>) => void
  updateStoredMentions: (mention: MentionUserData) => void
}

export type HashtagState = {
  activePostId: number | null
  data: Hashtag | null
  mentionSearchKey: string
  mentionsDisclosure: UseDisclosureReturn
  posts: Record<number, PostState>
  quotesQuery: UseQueryResult<RedisQuote[]>
  savedMentions: MentionUserData[]
  trendsDisclosure: UseDisclosureReturn
}

export type HashtagContextType = HashtagState & HashtagActions

export type HashtagProviderProps = {
  children: ReactNode
  hashtag: Hashtag
}
