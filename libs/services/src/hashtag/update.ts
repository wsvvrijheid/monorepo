import { useToast } from '@chakra-ui/react'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { Hashtag, HashtagUpdateInput } from '@wsvvrijheid/types'

export const updateField = ({
  id,
  ...args
}: HashtagUpdateInput & { id: number }) => {
  return Mutation.put<Hashtag, HashtagUpdateInput>('api/hashtags', id, args)
}

export const useUpdateHashtagMutation = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  return useMutation({
    mutationKey: ['update-hashtag'],
    mutationFn: ({ id, ...args }: HashtagUpdateInput & { id: number }) =>
      updateField({ id, ...args }),
    onSuccess: (res: HashtagUpdateInput) => {
      queryClient.invalidateQueries(queryKey)
      toast({
        title: `Mainhashag updated`,
        description: `Mainhashtag ${res.title} has been updated`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      console.log('response on success in services', res)
    },
    onError: error => {
      console.error('error in sercices', error)
      toast({
        title: 'Error',
        description: `Something went wrong`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })
}
