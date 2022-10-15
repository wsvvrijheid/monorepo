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
  const response = await Request.single<{ data: Topic[] }>({
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
    recommendedTopics.map(recommended => {
      if (recommended.url === topic.url) {
        topic.isRecommended = true
      } else {
        topics.push({
          url: recommended.url,
          title: recommended.title,
          description: recommended.description,
          category: recommended.category,
          image: recommended.image,
          time: recommended.time,
          locale: recommended.locale,
          publisher: recommended.publisher,
          isRecommended: true,
        })
      }
    })
    return topic
  })
}

export const useTopic = () => {
  return useQuery({
    queryKey: ['topics'],
    queryFn: topicQueryFn,
  })
}
