import { useToast } from '@chakra-ui/react'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { Activity, ActivityUpdateInput } from '@wsvvrijheid/types'

export const updateActivity = ({
  id,
  ...args
}: ActivityUpdateInput & { id: number }) => {
  return Mutation.put<Activity, ActivityUpdateInput>('api/activities', id, args)
}

export const useUpdateActivityMutation = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  return useMutation({
    mutationKey: ['update-activity'],
    mutationFn: ({ id, ...args }: ActivityUpdateInput & { id: number }) =>
      updateActivity({ id, ...args }),
    onSuccess: (res: Activity) => {
      queryClient.invalidateQueries(queryKey)
      toast({
        title: `Activity updated`,
        description: `Activity ${res.title} has been updated`,
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
