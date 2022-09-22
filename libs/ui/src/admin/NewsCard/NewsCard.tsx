import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { NewsCardBase } from '@wsvvrijheid/ui'
import { createMutation } from '@wsvvrijheid/utils'
import { RecommendedTopic, RecommendedTopicCreateInput } from 'libs/types/src/recommended-topic'
import { FC, useEffect, useState } from 'react'
import { NewsCardProps } from './index'

export const NewsCard: FC<NewsCardProps> = ({ news, userId, ...rest }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const toast = useToast()
  const recommendMutation = useMutation({
    mutationKey: ['recommend-topic'],
    mutationFn: () =>
      createMutation<RecommendedTopic, RecommendedTopicCreateInput>(`api/recommended-topics`, 
        { ...news, recommender: userId },
      )
  })
  const handleBookmark = (id: string) => {
    const bookmarks = localStorage.getItem('bookmarks')
    if (bookmarks) {
      let parsedBookmarks = JSON.parse(bookmarks)
      if (parsedBookmarks.filter((item: string) => item == id).length == 0) {
        parsedBookmarks.push(id)
        localStorage.setItem('bookmarks', JSON.stringify(parsedBookmarks))
        setIsBookmarked(true)
      } else {
        parsedBookmarks = parsedBookmarks.splice(1, parsedBookmarks.indexOf(id))
        localStorage.setItem('bookmarks', JSON.stringify(parsedBookmarks))
        setIsBookmarked(false)
      }
    } else {
      localStorage.setItem('bookmarks', JSON.stringify([id]))
      setIsBookmarked(true)
    }
  }

  const handleShare = (id: string) => {}

  const handleView = (url: string) => {
    window.open(url, '_blank')
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

  useEffect(() => {
    const bookmarks = localStorage.getItem('bookmarks')
    if (bookmarks) {
      const parsedBookmarks = JSON.parse(bookmarks)
      parsedBookmarks.filter((item: string) => item == news.id).length > 0
        ? setIsBookmarked(true)
        : null
    }
  }, [isBookmarked])

  return (
    <NewsCardBase
      news={news}
      {...rest}
      onBookmark={handleBookmark}
      onRecommend={handleRecommend}
      onShare={handleShare}
      onView={handleView}
      isBookmarked={isBookmarked}
    />
  )
}
