// import { useEffect, useState } from 'react'

import { SimpleGrid } from '@chakra-ui/react'
import {
  useGetRecommendedTopics,
  //  useTopic
} from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
// import { TopicBase } from '@wsvvrijheid/types'
import { AdminLayout, TopicCard } from '@wsvvrijheid/ui'

const NewsBookmarkedPage = () => {
  const { user } = useAuthSelector()
  // const [topicsData, setTopicsData] = useState()

  const { data, isLoading } = useGetRecommendedTopics()

  // const { data: topics, isLoading: isTopicLoading } = useTopic()

  // useEffect(() => {
  //   if (topics) {
  //     const recomendedTopics: TopicBase[] = topics.filter(
  //       topic => topic.isRecommended,
  //     )
  //     setTopicsData(recomendedTopics)
  //   }
  // }, [topics])

  // console.log(topicsData)

  return (
    <AdminLayout
      title="News"
      headerProps={{
        onSearch: () => null,
        filterMenuCloseOnSelect: false,
        searchPlaceHolder: 'Search bookmarks',
      }}
    >
      <SimpleGrid columns={{ base: 1 }} gap={4}>
        {data?.map((topic, i) => (
          <TopicCard
            key={topic.url}
            variant="horizontal"
            topic={topic}
            userId={user?.id}
            isLoading={isLoading}
            hideDescription={false}
          />
        ))}

        {/* {topicsData?.map((topic, i) => (
          <TopicCard
            key={topic.url}
            variant="horizontal"
            topic={topic}
            userId={user?.id}
            isLoading={isTopicLoading}
            hideDescription={false}
          />
        ))} */}
      </SimpleGrid>
    </AdminLayout>
  )
}

export default NewsBookmarkedPage
