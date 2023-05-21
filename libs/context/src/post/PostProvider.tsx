import { FC, createContext, useContext, useEffect, useState } from 'react'

import { TWITTER_CHAR_LIMIT, TWITTER_LINK_CHAR_COUNT } from './constants'
import { initialPostContext, initialPostState } from './state'
import { PostContextType, PostProviderProps, PostState } from './types'
import { useHashtagContext } from '../hashtag'

export const PostContext = createContext<PostContextType>(initialPostContext)

export const PostProvider: FC<PostProviderProps> = ({ post, children }) => {
  const [postState, setPostState] = useState<PostState>({
    ...initialPostState,
    post,
  })

  const { postMentions, postTrends } = useHashtagContext()

  const updatePostContent = (newState: Partial<PostState>) => {
    const state = { ...postState, ...newState }
    const { mentionUsernames = [], trendNames = [], sentence = '' } = state
    const mentionsStr = mentionUsernames.filter(Boolean).join('\n')

    const trendsStr = trendNames.filter(Boolean).join('\n')

    const postContent = [sentence, mentionsStr, trendsStr]
      .filter(Boolean)
      .join('\n\n')

    const count = TWITTER_LINK_CHAR_COUNT + postContent.length

    const percentage = Math.round((count / TWITTER_CHAR_LIMIT) * 100)
    const isExceeded = count > TWITTER_CHAR_LIMIT
    const exceededCharacters =
      count - TWITTER_CHAR_LIMIT > 0 ? count - TWITTER_CHAR_LIMIT : 0

    const threshold = sentence.length - exceededCharacters
    const availableCount = TWITTER_CHAR_LIMIT - count

    const updatedState: PostState = {
      ...state,
      post: state.post || null,
      defaultHashtags: state.defaultHashtags || [],
      mentionUsernames: state.mentionUsernames || [],
      trendNames: state.trendNames || [],
      sentence: state.sentence || '',
      sentences: state.sentences || [],
      postContent,
      count,
      isExceeded,
      threshold,
      availableCount,
      percentage,
    }

    setPostState(updatedState)
  }

  useEffect(() => {
    updatePostContent({
      mentionUsernames: postMentions[post.id] ?? [],
    })
  }, [postMentions, post.id])

  useEffect(() => {
    updatePostContent({
      trendNames: postTrends[post.id] ?? [],
    })
  }, [postTrends, post.id])

  return (
    <PostContext.Provider
      value={{
        // state
        ...postState,
        // actions
        updatePostContent,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export const usePostContext = () => useContext(PostContext)
