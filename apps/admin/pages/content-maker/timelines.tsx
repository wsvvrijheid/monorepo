import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTimelines } from '@wsvvrijheid/services'
import { AdminLayout } from '@wsvvrijheid/ui'
import axios from 'axios'
import TimelineBoard from 'libs/ui/src/admin/TimelineBoard/TimelineBoard'

const Timelines = () => {
  const [timelines, setTimelines] = useState([])

  // const timelines = useTimelines()
  // console.log(timelines)

  const config = {
    method: 'get',
    url: 'https://api.samenvvv.nl/api/timelines/',
    headers: {
      Authorization:
        'Bearer a5b760ef9b2be5a70a1115206d206d891bf1c29cdf6578cd22ac8cf40a7222522b1d2a70c386c52e8450467e58e4a46a3acca2d70dde1e7b99b21e1f8da78cbecddcdf6550f6d01c099977d211a8d3d66e8f9a1301bb8742c110199d06c8aa26cebca9c5f6a435aab70d07392d08318913cdd6d78653a7cef41e7eaf3054c72c',
    },
  }
  useEffect(() => {
    const getTimeline = async () => {
      const { data } = await axios(config)
      const response = data.response
      setTimelines(data.data)
    }
    getTimeline()
  }, [])

  return (
    <AdminLayout title="Timelines">
      <TimelineBoard timelines={timelines} />
    </AdminLayout>
  )
}

export default Timelines
