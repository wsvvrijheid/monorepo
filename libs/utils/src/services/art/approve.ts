import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { Art } from '@wsvvrijheid/types'

import { updateMutation } from '../../lib'
export type UpdateFeedbackInput = {
  art: number
  editor: number
  feedback: string
}
export const approveArt = ({
  art,
  editor,
  feedback,
}: {
  art: number
  editor: number
  feedback: string
}) => {
  const body = { approvalStatus: 'approved', updatedAt: new Date() }
  if (!feedback) {
    throw new Error('feedback field is required')
  }
  return updateMutation<Art, typeof body>('api/arts', art, body)
}

export const useApproveArt = () => {
  const toast = useToast()

  return useMutation({
    mutationKey: ['approve-art'],
    mutationFn: ({ art, editor, feedback }: UpdateFeedbackInput) =>
      approveArt({ art, editor, feedback }),
    onSuccess: () => {
      // TODO Add translations
      toast({
        title: 'Art Approved',
        description: 'Art has been approved',
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
