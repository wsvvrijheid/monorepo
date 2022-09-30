import { useToast } from '@chakra-ui/react'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Collection, CollectionUpdateInput } from '@wsvvrijheid/types'

import { Mutation } from '../../lib'

export const updateCollectionField = ({
  id,
  ...args
}: CollectionUpdateInput & { id: number }) => {
  return Mutation.put<Collection, CollectionUpdateInput>(
    'api/collections',
    id,
    args,
  )
}

export const useUpdateCollectionMutation = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  return useMutation({
    mutationKey: ['update-collection'],
    mutationFn: ({ id, ...args }: CollectionUpdateInput & { id: number }) =>
      updateCollectionField({ id, ...args }),
    onSuccess: (res: Collection) => {
      queryClient.invalidateQueries(queryKey)
      toast({
        title: `Collection updated`,
        description: `Collection ${res.title} has been updated`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: error => {
      console.error(error)
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
