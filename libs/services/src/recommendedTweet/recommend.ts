import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { useAuthSelector } from '@wsvvrijheid/store'
import {
  RecommendedTweet,
  RecommendedTweetCreateInput,
} from '@wsvvrijheid/types'

export const recommendTweet = (
  recommendedTweet: RecommendedTweetCreateInput,
  token?: string,
) => {
  return Mutation.post<RecommendedTweet, RecommendedTweetCreateInput>(
    'api/recommended-tweets',
    recommendedTweet,
    token,
  )
}

export const useRecommendTweet = () => {
  const toast = useToast()
  const { token } = useAuthSelector()

  return useMutation({
    mutationKey: ['create-recommended-tweet'],
    mutationFn: (recommendedTweet: RecommendedTweetCreateInput) => {
      console.log('recommendedTweet', recommendedTweet)
      return recommendTweet(recommendedTweet, token ?? undefined)
    },
    onSuccess: res => {
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
