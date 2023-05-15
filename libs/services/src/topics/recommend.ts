import { useMutation } from '@tanstack/react-query'

import { useAuth } from '@wsvvrijheid/context'
import { Mutation } from '@wsvvrijheid/lib'
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
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['recommend-topic'],
    mutationFn: (createInput: RecommendedTopicCreateInput) =>
      recommendTopic(createInput, token as string),
  })
}
