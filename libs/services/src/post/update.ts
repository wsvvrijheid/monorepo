import { useToast } from '@chakra-ui/react'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { Post, PostUpdateInput } from '@wsvvrijheid/types'

export const updatePost = ({
  id,
  ...args
}: PostUpdateInput & { id: number }) => {
  return Mutation.put<Post, PostUpdateInput>('api/posts', id, args)
}

export const useUpdatePostMutation = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  return useMutation({
    mutationKey: ['update-post'],
    mutationFn: updatePost,
    onSuccess: updatedPost => {
      queryClient.invalidateQueries(queryKey)
      toast({
        title: `Post updated`,
        description: `Post ${updatedPost.title} has been updated`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
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
