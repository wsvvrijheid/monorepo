import { useMutation } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import {
  RecommendedTopic,
  RecommendedTopicCreateInput,
} from '@wsvvrijheid/types'

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
