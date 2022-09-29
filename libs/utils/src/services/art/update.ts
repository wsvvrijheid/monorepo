import { useToast } from '@chakra-ui/react'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Art, ArtUpdateInput } from '@wsvvrijheid/types'

import { Mutation } from '../../lib'

export const updateField = ({
  id,
  ...args
}: ArtUpdateInput & { id: number }) => {
  return Mutation.put<Art, ArtUpdateInput>('api/arts', id, args)
}

export const useUpdateArtMutation = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  return useMutation({
    mutationKey: ['update-art'],
    mutationFn: ({ id, ...args }: ArtUpdateInput & { id: number }) =>
      updateField({ id, ...args }),
    onSuccess: (res: Art) => {
      queryClient.invalidateQueries(queryKey)
      toast({
        title: `Art updated`,
        description: `Art ${res.title} has been updated`,
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
