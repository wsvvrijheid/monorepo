import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { Art, ArtCreateInput } from '@wsvvrijheid/types'

export const createArt = (artCreateInput: ArtCreateInput) => {
  return Mutation.post<Art, ArtCreateInput>('api/arts', {
    ...artCreateInput,
    publishedAt: null,
  })
}

export const useCreateArt = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['create-art'],
    mutationFn: createArt,
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })
}
