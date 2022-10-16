import { FC } from 'react'

import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useRecommendTopic } from '@wsvvrijheid/utils'
import { useLocalStorage } from 'react-use'

import { TopicCardBase } from '../TopicCardBase'
import { TopicCardProps } from './index'

export const TopicCard: FC<TopicCardProps> = ({
  topic,
  userId,
  isLoading,
  ...rest
}) => {
  const [bookmarksStorage, setBookmarksStorage] = useLocalStorage<string[]>(
    'bookmarks',
    [],
  )

  const queryClient = useQueryClient()

  const toast = useToast()
  const { mutate, isLoading: isRecommendationLoading } = useRecommendTopic()

  const isBookmarked = bookmarksStorage?.some(url => url === topic.url)

  const handleBookmark = () => {
    if (isBookmarked) {
      setBookmarksStorage(bookmarksStorage?.filter(url => url !== topic.url))
    } else {
      setBookmarksStorage([...(bookmarksStorage as string[]), topic.url])
    }
  }

  const handleShare = () => {
    console.log('Share')
  }

  const handleView = () => {
    window.open(topic.url, '_blank')
  }

  const handleRecommend = () => {
    mutate(
      {
        ...topic,
        recommender: userId,
      },
      { onSettled: () => queryClient.invalidateQueries(['topic']) },
    )
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
      isLoading={isLoading || isRecommendationLoading}
    />
  )
}
