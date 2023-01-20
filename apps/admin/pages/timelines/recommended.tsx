import { useSearchModel } from '@wsvvrijheid/services'
import { RecommendedTweet, Timeline } from '@wsvvrijheid/types'
import {
  AdminLayout,
  Container,
  MasonryGrid,
  RecommendedTweetCard,
} from '@wsvvrijheid/ui'

const RecommendedTweetPage = () => {
  const { data: recommendedTweet, isLoading } = useSearchModel<Timeline>({
    url: 'api/recommended-tweets',
  })

  return (
    <AdminLayout title="Recomended Tweets" isLoading={isLoading}>
      <Container>
        <MasonryGrid cols={[1, 1, 1, 2, 3]}>
          {recommendedTweet?.data?.map((t, key) => (
            <RecommendedTweetCard
              tweet={t as unknown as RecommendedTweet}
              key={key}
            />
          ))}
        </MasonryGrid>
      </Container>
    </AdminLayout>
  )
}

export default RecommendedTweetPage
