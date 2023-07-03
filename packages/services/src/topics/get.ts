import { useQuery } from '@tanstack/react-query'

import { strapiRequest } from '@wsvvrijheid/lib'
import { Topic } from '@wsvvrijheid/types'

export const getTopics = async () => {
  const response = await strapiRequest<Topic>({
    url: 'api/topic',
  })

  return response?.data || ({} as Topic)
}

export const useTopic = () => {
  return useQuery({
    queryKey: ['topics'],
    queryFn: getTopics,
  })
}
