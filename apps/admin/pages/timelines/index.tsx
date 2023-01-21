import { useSearchModel } from '@wsvvrijheid/services'
import { RecommendedTweet, Timeline } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelCreateModal,
  recommendedTweetFields,
  recommendedTweetSchema,
  TimelineBoard,
} from '@wsvvrijheid/ui'

const Timelines = () => {
  const {
    data: timelines,
    isLoading,
    refetch,
  } = useSearchModel<Timeline>({
    url: 'api/timelines',
  })

  return (
    <AdminLayout title="Timelines" isLoading={isLoading}>
      <ModelCreateModal<RecommendedTweet>
        title="Create Recommended Tweet"
        url="api/recommended-tweets"
        schema={recommendedTweetSchema}
        fields={recommendedTweetFields}
        onSuccess={refetch}
      >
        Create Recommended Tweet
      </ModelCreateModal>
      <TimelineBoard timelines={timelines?.data} />
    </AdminLayout>
  )
}

export default Timelines
