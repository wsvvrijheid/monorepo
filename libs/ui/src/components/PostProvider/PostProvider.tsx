import {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
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
  const { data: sentences = [] } = useGetPostSentences(post.id)

  const hasUpdated = useRef(false)

  const updatePostContent = useCallback((newState: Partial<PostState>) => {
    const mentionUsernames = postMentions[post.id] ?? []
    const trendNames = postTrends[post.id] ?? []
    const defaultTrendnames = defaultTrends[post.id] ?? []

    const state = { ...postState, ...newState }
    const { sentence = '' } = state
    const mentionsStr = mentionUsernames.filter(Boolean).join('\n')

    // console.log('UpdatePost', Object.keys(newState))

    const trendsStr = [...defaultTrendnames, ...trendNames]
      .filter(Boolean)
      .join('\n')

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
    if (!sentences.length && !postState.sentence) {
      const sampleDescription =
        post.description?.slice(0, 100) ?? 'Add a description to your post'

      updatePostContent({
        sentence: sampleDescription,
        shareCount: 0,
        sentences,
      })

      return
    }

    const leastSharedSentence = sentences.reduce((prev, current) => {
      const [, prevShareCount] = prev
      const [, currentShareCount] = current

      return Number(prevShareCount) < Number(currentShareCount) ? prev : current
    }, sentences[0] ?? '::')

    const [sentence, shareCount] = leastSharedSentence.split('::')

    if (hasUpdated.current) return

    updatePostContent({
      sentences,
      sentence,
      shareCount: Number(shareCount) ?? 0,
    })

    hasUpdated.current = true
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
