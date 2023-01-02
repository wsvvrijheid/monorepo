import {
  AdminLayout,
  Container,
  MasonryGrid,
  TimelineLocalTweet,
  TimelineTweet,
} from '@wsvvrijheid/ui'
import { useLocalStorage } from 'usehooks-ts'

const TweetBookmarkedPage = () => {
  const [tweetBookmarksStorage] = useLocalStorage<TimelineLocalTweet[]>(
    'tweetBookmarks',
    [],
  )

  return (
    <AdminLayout title="Bookmarked Tweets">
      <Container>
        <MasonryGrid cols={[1, 1, 1, 2, 3]}>
          {tweetBookmarksStorage.map((t, key) => (
            <TimelineTweet tweet={t.tweet} user={t.user} key={key} />
          ))}
        </MasonryGrid>
      </Container>
    </AdminLayout>
  )
}

export default TweetBookmarkedPage
