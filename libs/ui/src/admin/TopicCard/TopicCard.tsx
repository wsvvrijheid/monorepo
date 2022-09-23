import { FC} from 'react'

import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { TopicCardBase } from '@wsvvrijheid/ui'
import { createMutation } from '@wsvvrijheid/utils'
import {
  RecommendedTopic,
  RecommendedTopicCreateInput,
} from 'libs/types/src/recommended-topic'
import { useLocalStorage } from 'react-use'

import { TopicCardProps } from './index'

export const TopicCard: FC<TopicCardProps> = ({ news, userId, ...rest }) => {
  // const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarksStorage, setBookmarksStorage] = useLocalStorage<number[]>(
    'bookmarks',[]
  )
  const toast = useToast()
  const recommendMutation = useMutation({
    mutationKey: ['recommend-topic'],
    mutationFn: () =>
      createMutation<RecommendedTopic, RecommendedTopicCreateInput>(
        `api/recommended-topics`,
        {
          date: news.date,
          description: news.description,
          title: news.title,
          recommender: userId,
          imageUrl: news.imageUrl,
          publisher: news.publisher,
          link: news.link,
        },
      ),
  })

  const isBookmarked = bookmarksStorage?.some(id => id === news.id)

  const handleBookmark = () => {
    if (isBookmarked) {
      setBookmarksStorage(bookmarksStorage?.filter(id => id !== news.id))
    } else {
      setBookmarksStorage([...(bookmarksStorage as number[]), news.id])
    }
  }

  // const handleBookmark = (id: string) => {
  //   const bookmarks = localStorage.getItem('bookmarks')
  //   if (bookmarks) {
  //     let parsedBookmarks = JSON.parse(bookmarks)
  //     if (parsedBookmarks.filter((item: string) => item == id).length == 0) {
  //       parsedBookmarks.push(id)
  //       localStorage.setItem('bookmarks', JSON.stringify(parsedBookmarks))
  //       setIsBookmarked(true)
  //     } else {
  //       parsedBookmarks = parsedBookmarks.splice(1, parsedBookmarks.indexOf(id))
  //       localStorage.setItem('bookmarks', JSON.stringify(parsedBookmarks))
  //       setIsBookmarked(false)
  //     }
  //   } else {
  //     localStorage.setItem('bookmarks', JSON.stringify([id]))
  //     setIsBookmarked(true)
  //   }
  // }

  const handleShare = () => {}

  const handleView = () => {
    window.open(news.link, '_blank')
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

  // useEffect(() => {
  //   const bookmarks = localStorage.getItem('bookmarks')
  //   if (bookmarks) {
  //     const parsedBookmarks = JSON.parse(bookmarks)
  //     parsedBookmarks.filter((item: string) => item == news.id).length > 0
  //       ? setIsBookmarked(true)
  //       : null
  //   }
  // }, [isBookmarked])

  return (
    <TopicCardBase
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
