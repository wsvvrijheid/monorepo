import { useToast } from '@chakra-ui/react'
import {QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  RecommendedTweet,
  RecommendedTweetCreateInput,
} from '@wsvvrijheid/types'
import { createMutation } from '@wsvvrijheid/utils'

// export const useRecomendedTweet = async (queryKey?: QueryKey) => {
//   const queryClient = useQueryClient()
//   const toast = useToast()

//   return useMutation({
//     mutationKey: ['create-recomended-tweet'],
//     mutationFn: (recomendedTweet: RecommendedTweetCreateInput) =>
//       createRecomendedTweet(recomendedTweet),
//     onSettled: () => {
//       queryClient.invalidateQueries(queryKey)
//     },
//     onSuccess: (res) => {
//       // TODO Add translations
//       console.log('res>>>>>',res)
//       toast({
//         title: 'Recomended',
//         description: 'Recomended Tweet Created',
//         status: 'success',
//         duration: 5000,
//         isClosable: true,
//       })
//     },
//     onError: () => {
//       toast({
//         title: 'Error',
//         description: 'Something went wrong',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       })
//     },
//   })
// }
// export const createRecomendedTweet = (
//   RecommendedTweet: RecommendedTweet,
// ) => {
//   return createMutation<RecommendedTweet, RecommendedTweetCreateInput>(
//     'api/recommended-tweet',
//     RecommendedTweet,
//   )
// }
