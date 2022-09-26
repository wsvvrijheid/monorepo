import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Art, ArtCreateInput } from '@wsvvrijheid/types'

import { createMutation } from '../../lib'

export const createArt = (artCreateInput: ArtCreateInput) => {
  return createMutation<Art, ArtCreateInput>('api/arts', {
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
