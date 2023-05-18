import { FC, createContext, useContext, useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { sampleSize } from 'lodash'

import { API_URL } from '@wsvvrijheid/config'
import { TOKEN } from '@wsvvrijheid/secrets'
import { MentionUserData, RedisQuote } from '@wsvvrijheid/types'

import { TWITTER_CHAR_LIMIT, TWITTER_LINK_CHAR_COUNT } from './constants'
import { initialHashtagContext, initialPostState } from './state'
import { HashtagContextType, HashtagProviderProps, PostState } from './types'

export const HashtagContext = createContext<HashtagContextType>(
  initialHashtagContext,
)

export const HashtagProvider: FC<HashtagProviderProps> = ({
  hashtag,
  children,
}) => {
  const [activePostId, setActivePostId] = useState<number | null>(null)
  const [mentionSearchKey, setMentionSearchKey] = useState<string>('')
  const [posts, setPosts] = useState<Record<number, PostState>>({})

  const updatePostContent = (postId: number, newState: Partial<PostState>) => {
    console.log('Updating post...', Object.keys(newState).join(', '))

    const postState = posts[postId] ?? initialPostState

    const state = { ...postState, ...newState }
    const { mentionUsernames = [], trendNames = [], sentence = '' } = state
    const mentionsStr = mentionUsernames.filter(a => !!a).join('\n')

    const trendsStr = trendNames.filter(a => !!a).join('\n')

    const defaultCount =
      TWITTER_LINK_CHAR_COUNT +
      [mentionsStr, trendsStr].filter(a => !!a).join('\n\n').length

    const postContent = [sentence, mentionsStr, trendsStr]
      .filter(a => !!a)
      .join('\n\n')

    const count = TWITTER_LINK_CHAR_COUNT + postContent.length
    const isExceeded = count > TWITTER_CHAR_LIMIT
    const exceededCharacters =
      count - TWITTER_CHAR_LIMIT > 0 ? count - TWITTER_CHAR_LIMIT : 0

    const threshold = sentence.length - exceededCharacters
    const availableCount = TWITTER_CHAR_LIMIT - defaultCount

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
    }

    setPosts({
      ...posts,
      [postId]: updatedState,
    })
  }

  const quotesQuery = useQuery<RedisQuote[]>({
    queryKey: ['quotes'],
    queryFn: () => fetch('/api/kv/quotes').then(res => res.json()),
  })

  const searchMentions = async (value: string) => {
    const response = await axios<MentionUserData[]>(
      `${API_URL}/api/mentions/search?q=${value}`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      },
    )
    const rawData = response.data

    const result = rawData.sort((a, b) => b.followers_count - a.followers_count)

    return result
  }

  const searchMentionsQuery = useQuery({
    queryKey: ['mentions', mentionSearchKey],
    queryFn: () => searchMentions(mentionSearchKey),
    enabled: mentionSearchKey.length > 0,
  })

  const removeStoredMention = (mention: string) => {
    return
  }

  const updateStoredMentions = (mention: MentionUserData) => {
    return
  }

  const addMentionToPost = (postId: number, mention: string) => {
    const post = posts[postId] ?? initialPostState
    const mentions = post.mentionUsernames ?? []
    const updatedMentions = [...mentions, mention]

    updatePostContent(postId, {
      mentionUsernames: updatedMentions,
    })
  }

  const addTrendToPost = (postId: number, trend: string) => {
    const post = posts[postId] ?? initialPostState
    const trends = post.trendNames ?? []
    const updatedTrends = [...trends, trend]

    updatePostContent(postId, {
      trendNames: updatedTrends,
    })
  }

  const removeMentionFromPost = (postId: number, mention: string) => {
    const post = posts[postId] ?? initialPostState

    const mentions = post.mentionUsernames ?? []
    const updatedMentions = mentions.filter(m => m !== mention)

    updatePostContent(postId, {
      mentionUsernames: updatedMentions,
    })
  }

  const removeTrendFromPost = (postId: number, trend: string) => {
    const post = posts[postId] ?? initialPostState
    const trends = post.trendNames ?? []
    const updatedTrends = trends.filter(m => m !== trend)

    updatePostContent(postId, {
      trendNames: updatedTrends,
    })
  }

  useEffect(() => {
    const trends = [hashtag.hashtagDefault, hashtag.hashtagExtra].filter(
      Boolean,
    ) as string[]

    const mentions = hashtag.mentions?.map(m => m.username) ?? []

    if (hashtag?.posts?.length) {
      const initialPosts = hashtag.posts.reduce((acc, post) => {
        acc[post.id] = {
          ...initialPostState,
          sentence: post.description as string,
          trendNames: trends,
          mentionUsernames: sampleSize(mentions, 1),
          post,
        }

        return acc
      }, {} as Record<number, PostState>)

      setPosts(initialPosts)
    }
  }, [])

  return (
    <HashtagContext.Provider
      value={{
        // state
        activePostId,
        data: hashtag,
        mentionSearchKey,
        posts,
        quotesQuery,
        savedMentions: [],
        searchMentionsQuery,
        // actions
        addMentionToPost,
        addTrendToPost,
        removeStoredMention,
        searchMentions,
        setActivePostId,
        setMentionSearchKey,
        updateStoredMentions,
        removeMentionFromPost,
        removeTrendFromPost,
        updatePostContent,
      }}
    >
      {children}
    </HashtagContext.Provider>
  )
}

export const useHashtagContext = () => useContext(HashtagContext)

export const usePostContext = (postId: number) => {
  const { posts, updatePostContent } = useHashtagContext()

  const post = posts[postId] ?? initialPostState

  const updatePost = (newState: Partial<PostState>) => {
    updatePostContent(postId, newState)
  }

  return {
    post,
    updatePost,
  }
}
