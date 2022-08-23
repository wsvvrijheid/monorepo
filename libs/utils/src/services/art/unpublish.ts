import { useToast } from '@chakra-ui/react'
import { Art } from '@wsvvrijheid/types'
import { useMutation, useQueryClient } from 'react-query'

import { mutation } from '../../lib'

export const unpublishArt = ({ id }: { id: number }) =>
  mutation<Art>().put('api/arts', id, { data: { publishedAt: null } })

export const useUnpublishArt = (queryKey: string) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationKey: 'delete-art',
    mutationFn: unpublishArt,
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
    onSuccess: () => {
      // TODO Add translations
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
