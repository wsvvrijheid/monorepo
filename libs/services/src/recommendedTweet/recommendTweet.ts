import { useToast } from '@chakra-ui/react'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import {
  RecommendedTweet,
  RecommendedTweetCreateInput,
} from '@wsvvrijheid/types'

export const recommendTweet = (
  recommendedTweet: RecommendedTweetCreateInput,
) => {
  return Mutation.post<RecommendedTweet, RecommendedTweetCreateInput>(
    'api/recommended-tweets',
    recommendedTweet,
  )
}

export const useRecommendTweet = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationKey: ['create-recommended-tweet'],
    mutationFn: (recommendedTweet: RecommendedTweetCreateInput) =>
      recommendTweet(recommendedTweet),
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
    onSuccess: res => {
      // TODO Add translations
      console.log('res>>>>>', res)
      toast({
        title: 'Recommended',
        description: 'Recommended Tweet Created',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })
}
