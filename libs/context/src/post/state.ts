import { PostState } from './types'

export const initialPostState: PostState = {
  post: null,
  availableCount: 0,
  count: 0,
  defaultHashtags: [],
  isExceeded: false,
  sentences: [],
  mentionUsernames: [],
  postContent: '',
  sentence: '',
  threshold: 0,
  trendNames: [],
  percentage: 0,
}

export const initialPostActions = {
  updatePostContent: () => null,
}

export const initialPostContext = {
  ...initialPostState,
  ...initialPostActions,
}
