import { useSearchModel } from '@wsvvrijheid/services'
import { RecommendedTweet } from '@wsvvrijheid/types'
import {
  AdminLayout,
  Container,
  MasonryGrid,
  RecommendedTweetCard,
} from '@wsvvrijheid/ui'

const RecommendedTweetPage = () => {
  const { data: tweets, isLoading } = useSearchModel<RecommendedTweet>({
    url: 'api/recommended-tweets',
  })

  return (
    <AdminLayout title="Recommended Tweets" isLoading={isLoading}>
      <Container>
        <MasonryGrid cols={[1, 1, 1, 2, 3]}>
          {tweets?.data?.map((tweet, key) => (
            <RecommendedTweetCard tweet={tweet} key={key} />
          ))}
        </MasonryGrid>
      </Container>
    </AdminLayout>
  )
}

export default RecommendedTweetPage
