import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { Activity } from '@wsvvrijheid/types'

export const deleteActivity = ({ id }: { id: number }) =>
  Mutation.delete<Activity>('api/activities', id)

export const useDeleteActivity = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationKey: ['delete-activity'],
    mutationFn: deleteActivity,
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
    onSuccess: () => {
      toast({
        title: 'Activity deleted',
        description: 'Activity has been deleted',
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
