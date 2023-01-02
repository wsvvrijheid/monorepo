import { useSearchModel } from '@wsvvrijheid/services'
import { Timeline } from '@wsvvrijheid/types'
import { AdminLayout, TimelineBoard } from '@wsvvrijheid/ui'

const Timelines = () => {
  const { data: timelines, isLoading } = useSearchModel<Timeline>({
    url: 'api/timelines',
  })

  return (
    <AdminLayout title="Timelines" isLoading={isLoading}>
      <TimelineBoard timelines={timelines?.data} />
    </AdminLayout>
  )
}

export default Timelines
