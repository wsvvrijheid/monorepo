import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query'
import { Art } from '@wsvvrijheid/types'

import { mutation } from '../../lib'

export const deleteArt = ({ id }: { id: number }) =>
  mutation<Art>().delete('api/arts', id)

export const useDeleteArt = (queryKey: QueryKey) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationKey: ['delete-art'],
    mutationFn: deleteArt,
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
        title: 'Art deleted',
        description: 'Art has been deleted',
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
