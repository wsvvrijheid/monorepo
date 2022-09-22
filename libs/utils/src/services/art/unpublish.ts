import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query'
import { Art } from '@wsvvrijheid/types'

import { updateMutation } from '../../lib'
export type unpublishMutation = {
  id: number
}
export const unpublishArt = ({ id }: { id: number }) => {
  const body = { publishedAt: null }

  return updateMutation<Art, typeof body>('api/arts', id, body)
}

export const useUnpublishArt = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationKey: ['unpublish-art'],
    mutationFn: ({ id }: unpublishMutation) => unpublishArt({ id }),
    onSettled: () => {
      // It's difficult to invalidate cache for paginated or filtering queries
      // Cache invalidation strategy might differ depending on where the mutation is called
      // If there would be no filters, sort, pages for fetching data,
      // we could just invalidate the cache as `queryClient.invalidateQueries('arts')`
      //
      // We fetch queries on `Club` page, so we can invalidate cache by using the same queryKey
      // That's why we give the current queryKey comes from `Club` page
      queryClient.invalidateQueries(queryKey)
    },
    onSuccess: res => {
      // TODO Add translations
      console.log('unpublish response |||||||||||||||||||||', res)
      queryClient.invalidateQueries(queryKey)
      toast({
        title: 'Art Unpublished',
        description: 'Art has been unpublished',
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
