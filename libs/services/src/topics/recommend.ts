import { useMutation } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { useAuthSelector } from '@wsvvrijheid/store'
import {
  RecommendedTopic,
  RecommendedTopicCreateInput,
} from '@wsvvrijheid/types'

export const recommendTopic = (
  createInput: RecommendedTopicCreateInput,
  token: string,
) =>
  Mutation.post<RecommendedTopic, RecommendedTopicCreateInput>(
    `api/recommended-topics`,
    createInput,
    token,
  )

export const useRecommendTopic = () => {
  const { token } = useAuthSelector()
  return useMutation({
    mutationKey: ['recommend-topic'],
    mutationFn: (createInput: RecommendedTopicCreateInput) =>
      recommendTopic(createInput, token as string),
  })
}
