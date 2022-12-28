import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { RecommendedTopic, Topic } from '@wsvvrijheid/types'

export const getRecommendedTopics = async () => {
  const response = await Request.collection<RecommendedTopic[]>({
    url: 'api/recommended-topics',
  })

  return response?.data
}

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

export const useGetRecommendedTopics = () => {
  return useQuery({
    queryKey: ['recommended-topics'],
    queryFn: getRecommendedTopics,
  })
}
