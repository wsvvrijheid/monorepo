import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { Hashtag } from '@wsvvrijheid/types'

export const deleteMainHashtag = ({ id }: { id: number }) =>
  Mutation.delete<Hashtag>('api/hashtags', id)

export const useDeleteMainhashtag = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationKey: ['delete-mainhashtag'],
    mutationFn: deleteMainHashtag,
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
    onSuccess: () => {
      // TODO Add translations
      toast({
        title: 'Mainhashtag deleted',
        description: 'Mainhashtag has been deleted',
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
