import { useToast } from '@chakra-ui/react'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { Activity, ActivityUpdateInput } from '@wsvvrijheid/types'

export const activityApprove = async ({ id }: { id: number }) => {
  const body: ActivityUpdateInput = {
    approvalStatus: 'approved',
    publishedAt: new Date().toISOString(),
  }

  return Mutation.put<Activity, ActivityUpdateInput>('api/activities', id, body)
}

export const useApproveMutation = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  return useMutation({
    mutationKey: ['activity-approve'],
    mutationFn: activityApprove,
    onSuccess: res => {
      queryClient.invalidateQueries(queryKey)
      toast({
        title: `Activity ${res.approvalStatus}`,
        description: `Activityhas been ${res.approvalStatus}`,
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
