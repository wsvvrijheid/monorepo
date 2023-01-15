import { SimpleGrid } from '@chakra-ui/react'
import { TopicBase } from '@wsvvrijheid/types'
import { AdminLayout, TopicCard } from '@wsvvrijheid/ui'
import { useLocalStorage } from 'usehooks-ts'

const NewsBookmarkedPage = () => {
  const [bookmarksStorage] = useLocalStorage<TopicBase[]>('bookmarks', [])

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
        {bookmarksStorage?.map((topic, i) => (
          <TopicCard key={topic.url} topic={topic} />
        ))}
      </SimpleGrid>
    </AdminLayout>
  )
}

export default NewsBookmarkedPage
