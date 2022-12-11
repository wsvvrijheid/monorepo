import { SimpleGrid } from '@chakra-ui/react'
import { Tweet } from '@wsvvrijheid/types'
import { AdminLayout, TimelineTweet } from '@wsvvrijheid/ui'
import { useLocalStorage } from 'usehooks-ts'

const TweetBookmarkedPage = () => {
  const [tweetBookmarksStorage, setTweetBookmarksStorage] = useLocalStorage<
    Tweet[]
  >('tweetBookmarks', [])
  console.log(tweetBookmarksStorage)

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
