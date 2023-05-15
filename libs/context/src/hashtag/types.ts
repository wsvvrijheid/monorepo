import { ReactNode } from 'react'

import { UseDisclosureReturn } from '@chakra-ui/react'
import { UseQueryResult } from '@tanstack/react-query'
import { UserV1 } from 'twitter-api-v2'

import { Hashtag, Post, Trend } from '@wsvvrijheid/types'

// Redis key format: <postId>::<content>::<shareCount>
export type RedisPost = `${number}::${string}::${number}`
export type RedisQuote = RedisPost

export type PostState = {
  data: Post | null
  availableCount: number
  count: number
  hashtags: string[]
  defaultHashtags: string[]
  text: string
  isExceeded: boolean
  mentionUsernames: string[]
  postContent: string
  postText: string
  list: RedisPost[]
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
  setPostText: (postId: number, content: string) => void
  updateStoredMentions: (mention: UserV1) => void
}

export type HashtagState = {
  activePostId: number | null
  data: Hashtag | null
  mentionsDisclosure: UseDisclosureReturn
  posts: PostState[]
  quotesQuery: UseQueryResult<RedisQuote[]>
  savedMentions: UserV1[]
  trendsDisclosure: UseDisclosureReturn
  trendQuery: UseQueryResult<Trend>
}

export type HashtagContextType = HashtagState & HashtagActions

export type HashtagProviderProps = {
  children: ReactNode
  hashtag: Hashtag
  initialPosts: PostState[]
  initialQuotes: RedisQuote[]
  initialTrend: Trend
}
