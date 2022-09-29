import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Collection, CollectionCreateInput } from '@wsvvrijheid/types'

import { Mutation } from '../../lib'

export const createCollection = (
  collectionCreateInput: CollectionCreateInput,
) => {
  return Mutation.post<Collection, CollectionCreateInput>(
    'api/collections',
    collectionCreateInput,
  )
}

export const useCreateCollection = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['create-collection'],
    mutationFn: createCollection,
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })
}
