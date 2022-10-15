import { FC } from 'react'

import { useToast } from '@chakra-ui/react'
import { useRecommendTopic } from '@wsvvrijheid/utils'
import { useLocalStorage } from 'react-use'

import { TopicCardBase } from '../TopicCardBase'
import { TopicCardProps } from './index'

export const TopicCard: FC<TopicCardProps> = ({
  topic,
  userId,
  isLoading,
  onTopicRecommended,
  ...rest
}) => {
  const [bookmarksStorage, setBookmarksStorage] = useLocalStorage<string[]>(
    'bookmarks',
    [],
  )

  const onSettled = () => {
    onTopicRecommended()
  }

  const toast = useToast()
  const { mutate, isLoading: isRecommendationLoading } =
    useRecommendTopic(onSettled)

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
    mutate({
      ...topic,
      recommender: userId,
    })
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
