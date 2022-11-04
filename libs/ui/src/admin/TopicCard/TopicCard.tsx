import { FC } from 'react'

import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useRecommendTopic } from '@wsvvrijheid/services'
import { TopicBase } from '@wsvvrijheid/types'
import { useLocalStorage } from 'usehooks-ts'

import { TopicCardBase } from '../TopicCardBase'
import { TopicCardProps } from './index'

export const TopicCard: FC<TopicCardProps> = ({
  topic,
  userId,
  isLoading,
  ...rest
}) => {
  const [bookmarksStorage, setBookmarksStorage] = useLocalStorage<TopicBase[]>(
    'bookmarks',
    [],
  )

  const queryClient = useQueryClient()

  const toast = useToast()
  const { mutate, isLoading: isRecommendationLoading } = useRecommendTopic()

  const isBookmarked = bookmarksStorage?.some(t => t.url === topic.url)

  const handleBookmark = () => {
    if (isBookmarked) {
      const filteredBookmarks = bookmarksStorage?.filter(
        t => t.url !== topic.url,
      )
      setBookmarksStorage(filteredBookmarks)
    } else {
      const newBookmarks = [...(bookmarksStorage || []), topic]
      setBookmarksStorage(newBookmarks)
    }
  }

  const handleShare = () => {
    console.log('Share')
  }

  const handleView = () => {
    window.open(
      topic.url,
      '_blank, popupWindow',
      `height=500,width=800,left=${window.innerWidth / 3},top=${
        window.innerHeight / 2
      },resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=yes,directories=no, status=yes`,
    )
  }

  const handleRecommend = () => {
    mutate(
      {
        ...topic,
        recommender: userId,
      },
      { onSettled: () => queryClient.invalidateQueries(['topics']) },
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
