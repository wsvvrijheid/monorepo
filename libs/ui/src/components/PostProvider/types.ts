import { ReactNode } from 'react'

import { Post, PostSentence } from '@wsvvrijheid/types'

export type PostState = {
  availableCount: number
  count: number
  isExceeded: boolean
  percentage: number
  post: Post | null
  postContent: string
  sentence: PostSentence | null
  threshold: number
}

export type PostActions = {
  updatePostContent: (state: Partial<PostState>) => void
}

export type PostContextType = PostState & PostActions

export type PostProviderProps = {
  children: ReactNode
  post: Post
}
