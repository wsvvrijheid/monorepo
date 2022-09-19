import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Art,
  ArtUpdateInput,
  Feedback,
  FeedbackArtCreateInput,
} from '@wsvvrijheid/types'

import { createMutation, updateMutation } from '../../lib'

export const createFeedback = async (
  args: FeedbackArtCreateInput & { description: string },
) => {
  if (!args.message) {
    throw new Error('feedback field is required')
  }

  await createMutation<Feedback, FeedbackArtCreateInput>('api/feedbacks', args)
  return updateMutation<Art, ArtUpdateInput>('api/arts', args.art, {
    approvalStatus: args.status === 'approve' ? 'approved' : 'rejected',
    description: args.description,
  })
}

export const useArtFeedbackMutation = (queryKey: QueryKey) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['art-feedback'],
    mutationFn: ({
      art,
      editor,
      message,
      status,
      description,
    }: FeedbackArtCreateInput & { description: string }) =>
      createFeedback({ art, editor, message, status, point: 1, description }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })
}
