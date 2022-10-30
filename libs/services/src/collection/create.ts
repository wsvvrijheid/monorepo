import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { Collection, CollectionCreateInput } from '@wsvvrijheid/types'

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
