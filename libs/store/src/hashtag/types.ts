import { UserV1 } from 'twitter-api-v2'

import { Hashtag, Mention, Post } from '@wsvvrijheid/types'

// Redis key format: <postId>::<content>::<shareCount>
type RedisPost = `${number}::${string}::${number}`

// Redis key format: <postId>::<content>::<shareCount>
type RedisQuote = RedisPost

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

export type HashtagState = {
  data: Hashtag | null
  currentPostId: number | null
  mentions: {
    isLoading: boolean
    data: Mention[]
    isError: boolean
  }
  searchedMentions: {
    isLoading: boolean
    data: UserV1[]
    isError: boolean
  }
  savedMentions: UserV1[]
  defaultHashtags: string[]
  posts: PostState[]
  quotes: RedisQuote[]
  trends: string[]
  trendNames: string[]
  isTrendsModalOpen: boolean
  isMentionsModalOpen: boolean
}
