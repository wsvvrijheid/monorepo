import { ReactNode } from 'react'

import { Post, RedisPost } from '@wsvvrijheid/types'

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
  percentage: number
}

export type PostActions = {
  updatePostContent: (state: Partial<PostState>) => void
}

export type PostContextType = PostState & PostActions

export type PostProviderProps = {
  children: ReactNode
  post: Post
}
