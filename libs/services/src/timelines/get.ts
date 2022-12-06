import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Timeline } from '@wsvvrijheid/types'

export const getTimelines = async () => {
  const response = await Request.collection<Timeline[]>({
    url: 'api/timelines',
  })

  return response?.data
}

export const useTimelines = () => {
  return useQuery({
    queryKey: ['timelines'],
    queryFn: getTimelines,
  })
}
