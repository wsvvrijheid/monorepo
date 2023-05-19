import { FC, createContext, useContext, useEffect, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { sampleSize } from 'lodash'

import { MentionUserData } from '@wsvvrijheid/types'

import { initialHashtagContext } from './state'
import { HashtagContextType, HashtagProviderProps } from './types'

export const HashtagContext = createContext<HashtagContextType>(
  initialHashtagContext,
)

export const HashtagProvider: FC<HashtagProviderProps> = ({
  hashtag,
  children,
}) => {
  const [activePostId, setActivePostId] = useState<number | null>(null)
  const [mentionSearchKey, setMentionSearchKey] = useState<string>('')
  const [postMentions, setPostMentions] = useState<Record<number, string[]>>({})
  const [postTrends, setPostTrends] = useState<Record<number, string[]>>({})

  const mentionsDisclosure = useDisclosure()
  const trendsDisclosure = useDisclosure()

  const removeStoredMention = (mention: string) => {
    return
  }

  const updateStoredMentions = (mention: MentionUserData) => {
    return
  }

  const addMentionToPost = (postId: number, mention: string) => {
    if (!postId) return

    const mentions = postMentions[postId] ?? []
    const updatedMentions = [...mentions, mention]

    setPostMentions({
      ...postMentions,
      [postId]: updatedMentions,
    })
  }

  const addTrendToPost = (postId: number, trend: string) => {
    if (!postId) return

    const trends = postTrends[postId] ?? []
    const updatedTrends = [...trends, trend]

    setPostTrends({
      ...postTrends,
      [postId]: updatedTrends,
    })
  }

  const removeMentionFromPost = (postId: number, mention: string) => {
    if (!postId) return

    const mentions = postMentions[postId] ?? []
    const updatedMentions = mentions.filter(m => m !== mention)

    setPostMentions({
      ...postMentions,
      [postId]: updatedMentions,
    })
  }

  const removeTrendFromPost = (postId: number, trend: string) => {
    if (!postId) return

    const trends = postTrends[postId] ?? []
    const updatedTrends = trends.filter(m => m !== trend)

    setPostTrends({
      ...postTrends,
      [postId]: updatedTrends,
    })
  }

  useEffect(() => {
    const trends = [hashtag.hashtagDefault, hashtag.hashtagExtra].filter(
      Boolean,
    ) as string[]

    const mentions = hashtag.mentions?.map(m => m.username) ?? []

    if (hashtag?.posts?.length) {
      hashtag.posts.forEach(post => {
        setPostMentions({
          ...postMentions,
          [post.id]: sampleSize(mentions, 1),
        })

        setPostTrends({
          ...postTrends,
          [post.id]: trends,
        })
      })
    }
  }, [])

  return (
    <HashtagContext.Provider
      value={{
        // state
        activePostId,
        data: hashtag,
        mentionSearchKey,
        savedMentions: [],
        mentionsDisclosure,
        trendsDisclosure,
        postMentions,
        postTrends,
        // actions
        addMentionToPost,
        addTrendToPost,
        removeStoredMention,
        setActivePostId,
        setMentionSearchKey,
        updateStoredMentions,
        removeMentionFromPost,
        removeTrendFromPost,
      }}
    >
      {children}
    </HashtagContext.Provider>
  )
}

export const useHashtagContext = () => useContext(HashtagContext)
