import { useQuery } from '@tanstack/react-query'
import { RecommendedTopic, Topic } from '@wsvvrijheid/types'

import { Request } from '../../lib'

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

  return response?.data?.data
}

export const topicQueryFn = async () => {
  const [recommendedTopics, topics] = await Promise.all([
    getRecommendedTopics(),
    getTopics(),
  ])
  if (!topics) return

  return topics.map(topic => {
    const isRecommended = recommendedTopics.some(r => r.url === topic.url)

    return { ...topic, isRecommended }
  })
}

export const useTopic = () => {
  return useQuery({
    queryKey: ['topics'],
    queryFn: topicQueryFn,
  })
}
