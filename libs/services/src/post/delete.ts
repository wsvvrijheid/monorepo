import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { Hashtag } from '@wsvvrijheid/types'

export const deletePost = ({ id }: { id: number }) =>
  Mutation.delete<Hashtag>('api/posts', id)

export const useDeletePost = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationKey: ['delete-Post'],
    mutationFn: deletePost,
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
    onSuccess: () => {
      toast({
        title: 'Post deleted',
        description: 'Post has been deleted',
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
