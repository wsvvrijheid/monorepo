import { useToast } from '@chakra-ui/react'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Art, ArtUpdateInput } from '@wsvvrijheid/types'

import { updateMutation } from '../../lib'
type updateFieldType = {
  artId: number
  field: string
  updateValue: string
}
export const updateField = ({
  artId,
  field,
  updateValue,
}: {
  artId: number
  field: string
  updateValue: string
}) => {
  if (updateValue === 'description') {
    return updateMutation<Art, ArtUpdateInput>('api/arts', artId, {
      description: field,
    })
  } else if (updateValue === 'content') {
    return updateMutation<Art, ArtUpdateInput>('api/arts', artId, {
      content: field,
    })
  }
}

export const useUpdateMutation = (queryKey: QueryKey) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  return useMutation({
    mutationKey: ['art-update-field'],
    mutationFn: ({ artId, field, updateValue }: updateFieldType) =>
      updateField({ artId, field, updateValue }),
    onSuccess: (res: Art) => {
      queryClient.invalidateQueries(queryKey)
      console.log('res on Success', res)
      toast({
        title: `Art updated`,
        description: `Art ${res.title} has been updated`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: er => {
      toast({
        title: 'Error',
        description: `${er}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })
}
