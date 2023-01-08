// import { useEffect, useState } from 'react'

import { SimpleGrid } from '@chakra-ui/react'
import { useSearchModel } from '@wsvvrijheid/services'
import { RecommendedTopic, StrapiLocale } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelCreateModal,
  TopicCard,
  topicFields,
  topicSchema,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const NewsBookmarkedPage = () => {
  const { locale } = useRouter()

  const { data, refetch } = useSearchModel<RecommendedTopic>({
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
      <ModelCreateModal<RecommendedTopic>
        title="Create News"
        url="api/recommended-topics"
        schema={topicSchema}
        fields={topicFields}
        onSuccess={refetch}
      >
        Create News
      </ModelCreateModal>
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
