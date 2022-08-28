import { Comment } from '@wsvvrijheid/types'
import { useMutation } from 'react-query'

import { mutation } from '../../lib'

type CreateArtCommentProps = {
  content: string
  name?: string
  email?: string
  id: number
  userId?: number
}

const createArtComment = ({
  content,
  name,
  email,
  id,
  userId,
}: CreateArtCommentProps) => {
  if (userId) {
    return mutation<Comment>().post(`api/comments`, {
      data: { content, art: id, user: userId },
    })
  }

  return mutation<Comment>().post(`api/comments`, {
    data: {
      content,
      name,
      email,
      art: id,
    },
  })
}

export const useArtCommentMutation = () => {
  return useMutation({
    mutationKey: 'create-comment',
    mutationFn: (args: CreateArtCommentProps) => createArtComment(args),
  })
}
