import { useMutation } from '@tanstack/react-query'
import { Art, ArtCreateInput } from '@wsvvrijheid/types'

import { createMutation } from '../../lib'

export const createArt = (artCreateInput: ArtCreateInput) => {
  return createMutation<Art, ArtCreateInput>('api/arts', artCreateInput)
}

export const useCreateArt = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) =>
  useMutation({
    mutationKey: ['create-art'],
    mutationFn: createArt,
    onSuccess,
    onError,
  })
