import { useTimelines } from '@wsvvrijheid/services'
import { AdminLayout, TimelineBoard } from '@wsvvrijheid/ui'

const Timelines = () => {
  const timelinesRequest = useTimelines()
  const timelines = timelinesRequest?.data
  console.log('Timelines in Timeline page :::::::', timelines)

  return (
    <AdminLayout title="Timelines">
      <TimelineBoard timelines={timelines} />
    </AdminLayout>
  )
}

export default Timelines
