import { useToast } from '@chakra-ui/react'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Art,
  ArtUpdateInput,
  Feedback,
  FeedbackArtCreateInput,
} from '@wsvvrijheid/types'

import { createMutation, updateMutation } from '../../lib'

export const createFeedback = async (args: FeedbackArtCreateInput) => {
  if (!args.message) {
    throw new Error('feedback field is required')
  }

  await createMutation<Feedback, FeedbackArtCreateInput>('api/feedbacks', args)
  return updateMutation<Art, ArtUpdateInput>('api/arts', args.art, {
    approvalStatus: args.status === 'approve' ? 'approved' : 'rejected',
  })
}

export const useArtFeedbackMutation = (queryKey: QueryKey) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  return useMutation({
    mutationKey: ['art-feedback'],
    mutationFn: ({ art, editor, message, status }: FeedbackArtCreateInput) =>
      createFeedback({ art, editor, message, status, point: 1 }),
    onSuccess: res => {
      queryClient.invalidateQueries(queryKey)
      toast({
        title: `Art ${res.approvalStatus}`,
        description: `Art has been ${res.approvalStatus}`,
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
