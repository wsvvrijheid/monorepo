// import { useEffect, useState } from 'react'

import { SimpleGrid } from '@chakra-ui/react'
import { useGetRecommendedTopics } from '@wsvvrijheid/services'
import { AdminLayout, TopicCard } from '@wsvvrijheid/ui'

const NewsBookmarkedPage = () => {
  const { data } = useGetRecommendedTopics()

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
          <TopicCard key={topic.url} topic={topic} />
        ))}
      </SimpleGrid>
    </AdminLayout>
  )
}

export default NewsBookmarkedPage
