import { ReactNode } from 'react'

import { Post, RedisPost } from '@wsvvrijheid/types'

export type PostState = {
  availableCount: number
  count: number
  isExceeded: boolean
  post: Post | null
  postContent: string
  sentence: string
  shareCount: number
  sentences: RedisPost[]
  threshold: number
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
