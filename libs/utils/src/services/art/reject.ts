import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { Art } from '@wsvvrijheid/types'

import { updateMutation } from '../../lib'
import { UpdateFeedbackInput } from './approve'

export const rejectArt = ({
  art,
  editor,
  feedback,
}: {
  art: number
  editor: number
  feedback: string
}) => {
  const body = {
    approvalStatus: 'rejected',
    editor,
    feedback,
  }
  if (!feedback) {
    throw new Error('feedback is required')
  }
  return updateMutation<Art, typeof body>('api/arts', art, body)
}
export const useRejectArt = () => {
  const toast = useToast()

  return useMutation({
    mutationKey: ['reject-art'],
    mutationFn: ({ art, editor, feedback }: UpdateFeedbackInput) =>
      rejectArt({ art, editor, feedback }),

    onSuccess: () => {
      // TODO Add translations
      toast({
        title: 'Art Reject',
        description: 'Art has been rejected',
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
