import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { UserV1 } from 'twitter-api-v2'

import { API_URL } from '@wsvvrijheid/config'
import { StrapiSingleResponse, Trend } from '@wsvvrijheid/types'

import { HashtagContext } from './HashtagContext'
import { HashtagProviderProps, PostState, RedisQuote } from './types'

export const HashtagProvider: FC<HashtagProviderProps> = ({
  initialQuotes,
  initialTrend,
  hashtag,
  initialPosts,
  children,
}) => {
  const [activePostId, setActivePostId] = useState<number | null>(null)
  const [posts, setPosts] = useState<PostState[]>(initialPosts)
  const mentionsDisclosure = useDisclosure()
  const trendsDisclosure = useDisclosure()

  const quotesQuery = useQuery<RedisQuote[]>({
    queryKey: ['quotes'],
    queryFn: () => fetch('/api/quotes').then(res => res.json()),
    initialData: initialQuotes,
  })

  const trendQuery = useQuery<Trend>({
    queryKey: ['trend'],
    queryFn: () =>
      axios<StrapiSingleResponse<Trend>>(`${API_URL}/api/trend`).then(
        res => res.data?.data,
      ),
    initialData: initialTrend,
  })

  const addMentionToPost = (postId: number, mention: string) => {
    setPosts(prev => prev)
  }

  const addTrendToPost = (postId: number, trend: string) => {
    setPosts(prev => prev)
  }

  const removeMentionFromPost = (postId: number, mention: string) => {
    setPosts(prev => prev)
  }

  const removeStoredMention = (mention: string) => {
    return
  }

  const removeTrendFromPost = (postId: number, trend: string) => {
    setPosts(prev => prev)
  }

  const setPostText = (postId: number, text: string) => {
    setPosts(prev => prev)
  }

  const updateStoredMentions = (mention: UserV1) => {
    return
  }

  return (
    <HashtagContext.Provider
      value={{
        // state
        activePostId,
        data: hashtag,
        mentionsDisclosure,
        posts,
        quotesQuery,
        savedMentions: [],
        trendQuery,
        trendsDisclosure,
        // actions
        addMentionToPost,
        addTrendToPost,
        removeMentionFromPost,
        removeStoredMention,
        removeTrendFromPost,
        setActivePostId,
        setPostText,
        updateStoredMentions,
      }}
    >
      {children}
    </HashtagContext.Provider>
  )
}
