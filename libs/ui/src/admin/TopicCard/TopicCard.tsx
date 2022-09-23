import { FC } from 'react'

import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import {
  RecommendedTopic,
  RecommendedTopicCreateInput,
} from '@wsvvrijheid/types'
import { createMutation } from '@wsvvrijheid/utils'
import { useLocalStorage } from 'react-use'

import { TopicCardBase } from '../TopicCardBase'
import { TopicCardProps } from './index'

export const TopicCard: FC<TopicCardProps> = ({ topic, userId, ...rest }) => {
  const [bookmarksStorage, setBookmarksStorage] = useLocalStorage<number[]>(
    'bookmarks',
    [],
  )

  const { title, description, date, imageUrl, publisher, link } = topic

  const toast = useToast()
  const recommendMutation = useMutation({
    mutationKey: ['recommend-topic'],
    mutationFn: () =>
      createMutation<RecommendedTopic, RecommendedTopicCreateInput>(
        `api/recommended-topics`,
        {
          date,
          description,
          title,
          recommender: userId,
          imageUrl,
          publisher,
          link,
        },
      ),
  })

  const isBookmarked = bookmarksStorage?.some(id => id === topic.id)

  const handleBookmark = () => {
    if (isBookmarked) {
      setBookmarksStorage(bookmarksStorage?.filter(id => id !== topic.id))
    } else {
      setBookmarksStorage([...(bookmarksStorage as number[]), topic.id])
    }
  }

  const handleShare = () => {
    console.log('Share')
  }

  const handleView = () => {
    window.open(topic.link, '_blank')
  }

  const handleRecommend = () => {
    recommendMutation.mutate()
    toast({
      title: 'Recommended',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    })
  }

  return (
    <TopicCardBase
      topic={topic}
      {...rest}
      onBookmark={handleBookmark}
      onRecommend={handleRecommend}
      onShare={handleShare}
      onView={handleView}
      isBookmarked={isBookmarked}
    />
  )
}
