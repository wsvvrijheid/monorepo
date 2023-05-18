import { ReactNode } from 'react'

import { UseDisclosureReturn } from '@chakra-ui/react'
import { UseQueryResult } from '@tanstack/react-query'

import {
  Hashtag,
  MentionUserData,
  Post,
  RedisPost,
  RedisQuote,
  Trend,
} from '@wsvvrijheid/types'

export type PostState = {
  post: Post | null
  availableCount: number
  count: number
  defaultHashtags: string[]
  isExceeded: boolean
  mentionUsernames: string[]
  postContent: string
  sentence: string
  sentences: RedisPost[]
  threshold: number
  trendNames: string[]
}

export type HashtagActions = {
  removeStoredMention: (mention: string) => void
  setActivePostId: (postId: number) => void
  updateStoredMentions: (mention: MentionUserData) => void
  addMentionToPost: (postId: number, mention: string) => void
  addTrendToPost: (postId: number, trend: string) => void
  searchMentions: (q: string) => void
  setMentionSearchKey: (key: string) => void
  removeMentionFromPost: (postId: number, mention: string) => void
  removeTrendFromPost: (postId: number, trend: string) => void
  updatePostContent: (postId: number, state: Partial<PostState>) => void
}

export type HashtagState = {
  activePostId: number | null
  data: Hashtag | null
  posts: Record<number, PostState>
  mentionsDisclosure: UseDisclosureReturn
  quotesQuery: UseQueryResult<RedisQuote[]>
  savedMentions: MentionUserData[]
  searchMentionsQuery: UseQueryResult<MentionUserData[]>
  trendQuery: UseQueryResult<Trend>
  trendsDisclosure: UseDisclosureReturn
  mentionSearchKey: string
}

export type HashtagContextType = HashtagState & HashtagActions

export type HashtagProviderProps = {
  children: ReactNode
  hashtag: Hashtag
}
