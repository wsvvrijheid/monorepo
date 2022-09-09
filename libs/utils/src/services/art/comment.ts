import { useMutation } from '@tanstack/react-query'
import { Comment } from '@wsvvrijheid/types'

import { createMutation } from '../../lib'

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
    const body = { content, art: id, user: userId }

    return createMutation<Comment, typeof body>('api/comments', body)
  }

  const body = { content, name, email, art: id }

  return createMutation<Comment, typeof body>('api/comments', body)
}

export const useArtCommentMutation = () => {
  return useMutation({
    mutationKey: ['create-comment'],
    mutationFn: (args: CreateArtCommentProps) => createArtComment(args),
  })
}
