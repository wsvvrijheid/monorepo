import { useMutation } from '@tanstack/react-query'
import {
  RecommendedTopic,
  RecommendedTopicCreateInput,
} from '@wsvvrijheid/types'
import { Mutation } from '@wsvvrijheid/utils'

export const recommendTopic = (createInput: RecommendedTopicCreateInput) =>
  Mutation.post<RecommendedTopic, RecommendedTopicCreateInput>(
    `api/recommended-topics`,
    createInput,
  )

export const useRecommendTopic = () =>
  useMutation({
    mutationKey: ['recommend-topic'],
    mutationFn: recommendTopic,
  })
