import { useTimelines } from '@wsvvrijheid/services'
import { AdminLayout, TimelineBoard } from '@wsvvrijheid/ui'

const Timelines = () => {
  const { data: timelines, isLoading } = useTimelines()

  return (
    <AdminLayout title="Timelines" isLoading={isLoading}>
      <TimelineBoard timelines={timelines} />
    </AdminLayout>
  )
}

export default Timelines
