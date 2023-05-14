import { TWITTER_CHAR_LIMIT, TWITTER_LINK_CHAR_COUNT } from './constants'
import { HashtagState } from './types'

export const updatePostContent = (
  state: HashtagState,
  postId: number,
): void => {
  const post = state.posts.find(p => p.data?.id === postId)

  if (!post) {
    return
  }

  const mentionsStr = post.mentionUsernames.filter(a => !!a).join('\n')

  const defaultHashtag = state.data?.hashtagDefault || []

  const trendsStr = [...defaultHashtag, ...state.trends]
    .filter(a => !!a)
    .join('\n')

  const defaultCount =
    TWITTER_LINK_CHAR_COUNT +
    [mentionsStr, trendsStr].filter(a => !!a).join('\n\n').length

  const postContent = [post.postText, mentionsStr, trendsStr]
    .filter(a => !!a)
    .join('\n\n')

  const count = TWITTER_LINK_CHAR_COUNT + postContent.length
  const isExceeded = count > TWITTER_CHAR_LIMIT
  const exceededCharacters =
    count - TWITTER_CHAR_LIMIT > 0 ? count - TWITTER_CHAR_LIMIT : 0

  post.count = count
  post.isExceeded = isExceeded
  post.postContent = postContent
  post.threshold = post.postText.length - exceededCharacters
  post.availableCount = TWITTER_CHAR_LIMIT - defaultCount
}
