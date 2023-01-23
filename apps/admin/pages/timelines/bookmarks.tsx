import { Tweet } from '@wsvvrijheid/types'
import { AdminLayout, Container, MasonryGrid, TweetCard } from '@wsvvrijheid/ui'
import { useLocalStorage } from 'usehooks-ts'

const TweetBookmarkedPage = () => {
  const [storageTweets] = useLocalStorage<Tweet[]>('bookmarked-tweets', [])

  return (
    <AdminLayout title="Bookmarked Tweets">
      <Container>
        <MasonryGrid cols={[1, 1, 1, 2, 3]}>
          {storageTweets.map((tweet, key) => (
            <TweetCard tweet={tweet} key={key} editable />
          ))}
        </MasonryGrid>
      </Container>
    </AdminLayout>
  )
}

export default TweetBookmarkedPage
