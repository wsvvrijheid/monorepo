import { useToast } from '@chakra-ui/react'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { Post } from '@wsvvrijheid/types'

export const postApprove = async ({ id }: { id: number }) => {
  const body = {
    approvalStatus: 'approved',
    publishedAt: new Date(),
  }

  return Mutation.put<Post, typeof body>('api/posts', id, body)
}

export const useApproveMutation = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  return useMutation({
    mutationKey: ['post-approve'],
    mutationFn: postApprove,
    //TODO we should add approved editor name here
    postApprove,
    onSuccess: res => {
      queryClient.invalidateQueries(queryKey)
      toast({
        title: `Post ${res.approvalStatus}`,
        description: `Post has been ${res.approvalStatus}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: error => {
      console.error(error)
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
