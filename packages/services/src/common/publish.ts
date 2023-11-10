import { useToast } from '@chakra-ui/react'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuthContext } from '@wsvvrijheid/context'
import { Mutation } from '@wsvvrijheid/lib'
import { StrapiEndpoint, StrapiModel } from '@wsvvrijheid/types'

export const publishModel = <T extends StrapiModel>(
  id: number,
  endpoint: StrapiEndpoint,
  token: string,
) => {
  const body = { publishedAt: new Date() }

  return Mutation.put<T, typeof body>(endpoint, id, body, token)
}

export const usePublishModel = <T extends StrapiModel>(
  endpoint: StrapiEndpoint,
  queryKey?: QueryKey,
) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: [`publish-${endpoint}`],
    mutationFn: ({ id }: { id: number }) =>
      publishModel<T>(id, endpoint, token as string),
    onSettled: () => {
      // It's difficult to invalidate cache for paginated or filtering queries
      // Cache invalidation strategy might differ depending on where the mutation is called
      // If there would be no filters, sort, pages for fetching data,
      // we could just invalidate the cache as `queryClient.invalidateQueries('arts')`
      //
      // We fetch queries on `Club` page, so we can invalidate cache by using the same queryKey
      // That's why we give the current queryKey comes from `Club` page
      queryClient.invalidateQueries({ queryKey })
    },
    onSuccess: () => {
      // TODO Add translations
      queryClient.invalidateQueries({ queryKey })
      toast({
        title: `Successfully Published`,
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
