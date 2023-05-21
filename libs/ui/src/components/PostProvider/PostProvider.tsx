import {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { useGetPostSentences } from '@wsvvrijheid/services'

import { TWITTER_CHAR_LIMIT, TWITTER_LINK_CHAR_COUNT } from './constants'
import { initialPostContext, initialPostState } from './state'
import { PostContextType, PostProviderProps, PostState } from './types'
import { useHashtagContext } from '../HashtagProvider'

export const PostContext = createContext<PostContextType>(initialPostContext)

export const PostProvider: FC<PostProviderProps> = ({ post, children }) => {
  const [postState, setPostState] = useState<PostState>({
    ...initialPostState,
    post,
  })

  const { postMentions, postTrends, defaultTrends } = useHashtagContext()
  const sentences = useGetPostSentences(post.id)

  const updatePostContent = useCallback((newState: Partial<PostState>) => {
    const mentionUsernames = postMentions[post.id] ?? []
    const trendNames = postTrends[post.id] ?? []
    const defaultTrendNames = defaultTrends[post.id] ?? []

    const state = { ...postState, ...newState }
    const { sentence } = state

    if (!sentence?.value) return

    const mentionsStr = mentionUsernames.filter(Boolean).join('\n')

    const trendsStr = [...defaultTrendNames, ...trendNames]
      .filter(Boolean)
      .join('\n')

    const postContent = [sentence.value, mentionsStr, trendsStr]
      .filter(Boolean)
      .join('\n\n')

    const count = TWITTER_LINK_CHAR_COUNT + postContent.length

    const percentage = Math.round((count / TWITTER_CHAR_LIMIT) * 100)
    const isExceeded = count > TWITTER_CHAR_LIMIT
    const exceededCharacters =
      count - TWITTER_CHAR_LIMIT > 0 ? count - TWITTER_CHAR_LIMIT : 0

    const threshold = sentence.value.length - exceededCharacters
    const availableCount = TWITTER_CHAR_LIMIT - count

    const updatedState: PostState = {
      ...state,
      post: state.post || null,
      postContent,
      count,
      isExceeded,
      threshold,
      availableCount,
      percentage,
    }

    setPostState(updatedState)
  }, [])

  useEffect(() => {
    if (!sentences.length) {
      return
    }

    const leastSharedSentence = sentences[0]

    // if (hasSaved.current) return

    updatePostContent({
      sentence: leastSharedSentence,
    })

    // hasSaved.current = true
  }, [sentences, post])

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
