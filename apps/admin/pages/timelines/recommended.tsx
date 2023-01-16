import { useSearchModel } from '@wsvvrijheid/services'
import { Timeline } from '@wsvvrijheid/types'
import {
  AdminLayout,
  Container,
  MasonryGrid,
  RecommendedTweetCard,
} from '@wsvvrijheid/ui'

const Timelines = () => {
  const { data: timelines, isLoading } = useSearchModel<Timeline>({
    url: 'api/recommended-tweets',
  })

  console.log('recomended tweets', timelines?.data)
  return (
    <AdminLayout title="Recomended Tweets" isLoading={isLoading}>
      <Container>
        <MasonryGrid cols={[1, 1, 1, 2, 3]}>
          {timelines?.data?.map((t, key) => (
            <RecommendedTweetCard tweet={t} key={key} />
          ))}
        </MasonryGrid>
      </Container>
    </AdminLayout>
  )
}

export default Timelines
