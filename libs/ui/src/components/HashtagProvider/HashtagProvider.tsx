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
  const [defaultTrends, setDefaultTrends] = useState<Record<number, string[]>>(
    {},
  )
  const [postSentenceShares, setPostSentenceShares] = useState<
    Record<number, number>
  >({})

  const mentionsDisclosure = useDisclosure()
  const trendsDisclosure = useDisclosure()

  const removeStoredMention = (mention: string) => {
    return
  }

  const updatePostSentenceShares = (postId: number, shares: number) => {
    return setPostSentenceShares({
      ...postSentenceShares,
      [postId]: shares,
    })
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

  const removeDefaultTrendFromPost = (postId: number, trend: string) => {
    if (!postId) return

    const trends = defaultTrends[postId] ?? []
    const updatedTrends = trends.filter(m => m !== trend)

    setDefaultTrends({
      ...defaultTrends,
      [postId]: updatedTrends,
    })
  }

  useEffect(() => {
    if (hashtag?.posts?.length) {
      const hashtagMentions = hashtag.mentions?.map(m => m.username) ?? []
      const defaultTrends = [
        hashtag.hashtagDefault,
        hashtag.hashtagExtra,
      ].filter(Boolean) as string[]

      const initialTags = hashtag.posts.reduce(
        (acc, post) => {
          const mentions = {
            ...acc.mentions,
            [post.id]: sampleSize(hashtagMentions, 1),
          }

          const trends = {
            ...acc.trends,
            [post.id]: defaultTrends,
          }

          return { ...acc, mentions, trends }
        },
        {
          trends: {},
          mentions: {},
        },
      )
      setPostMentions(initialTags.mentions)
      setDefaultTrends(initialTags.trends)
    }
  }, [])

  return (
    <HashtagContext.Provider
      value={{
        // state
        activePostId,
        data: hashtag,
        defaultTrends,
        mentionSearchKey,
        mentionsDisclosure,
        postMentions,
        postSentenceShares,
        postTrends,
        savedMentions: [],
        trendsDisclosure,

        // actions
        addMentionToPost,
        addTrendToPost,
        removeDefaultTrendFromPost,
        removeMentionFromPost,
        removeStoredMention,
        removeTrendFromPost,
        setActivePostId,
        setMentionSearchKey,
        updatePostSentenceShares,
        updateStoredMentions,
      }}
    >
      {children}
    </HashtagContext.Provider>
  )
}

export const useHashtagContext = () => useContext(HashtagContext)
