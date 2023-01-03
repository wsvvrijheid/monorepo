// import { useEffect, useState } from 'react'

import { SimpleGrid } from '@chakra-ui/react'
import { useSearchModel } from '@wsvvrijheid/services'
import { RecommendedTopic, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, TopicCard } from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const NewsBookmarkedPage = () => {
  const { locale } = useRouter()

  const { data } = useSearchModel<RecommendedTopic>({
    url: 'api/recommended-topics',
    locale: locale as StrapiLocale,
  })

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
        {data?.data?.map((topic, i) => (
          <TopicCard
            key={topic.url}
            topic={{ ...topic, isRecommended: true }}
          />
        ))}
      </SimpleGrid>
    </AdminLayout>
  )
}

export default NewsBookmarkedPage
