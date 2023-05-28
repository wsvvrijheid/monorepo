import { PostState } from './types'

export const initialPostState: PostState = {
  availableCount: 0,
  count: 0,
  isExceeded: false,
  percentage: 0,
  post: null,
  postContent: '',
  sentence: {
    postId: 0,
    value: '',
    index: 0,
    isPublished: false,
    shareCount: 0,
  },
  threshold: 0,
}

export const initialPostActions = {
  updatePostContent: () => null,
}

export const initialPostContext = {
  ...initialPostState,
  ...initialPostActions,
}
