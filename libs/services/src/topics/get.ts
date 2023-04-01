import { useQuery } from '@tanstack/react-query'

import { Request } from '@wsvvrijheid/lib'
import { Topic } from '@wsvvrijheid/types'

export const getTopics = async () => {
  const response = await Request.single<Topic>({
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
