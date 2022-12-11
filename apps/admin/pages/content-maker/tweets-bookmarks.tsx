import { SimpleGrid } from '@chakra-ui/react'
import { AdminLayout, TimelineLocalTweet, TimelineTweet } from '@wsvvrijheid/ui'
import { useLocalStorage } from 'usehooks-ts'

const TweetBookmarkedPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tweetBookmarksStorage, setTweetBookmarksStorage] = useLocalStorage<
    TimelineLocalTweet[]
  >('tweetBookmarks', [])

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
        {tweetBookmarksStorage.map((t, key) => (
          <TimelineTweet tweet={t.tweet} user={t.user} key={key} />
        ))}
      </SimpleGrid>
    </AdminLayout>
  )
}

export default TweetBookmarkedPage
