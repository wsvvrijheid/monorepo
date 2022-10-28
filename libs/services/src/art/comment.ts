import { useMutation } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import {
  Comment,
  CommentArtCreateInput,
  CommentArtCreateInputPublic,
  CommentArtCreateInputUser,
} from '@wsvvrijheid/types'

type CreateArtCommentProps = {
  content: string
  name?: string
  email?: string
  art: number
  user?: number
}

const createArtComment = ({
  content,
  name,
  email,
  art,
  user,
}: CreateArtCommentProps) => {
  if (user) {
    const body = { content, art, user }

    return Mutation.post<Comment, CommentArtCreateInputUser>(
      'api/comments',
      body,
    )
  }

  if (!name || !email) {
    throw new Error('Name or email is required')
  }

  const body = { content, name, email, art }

  return Mutation.post<Comment, CommentArtCreateInputPublic>(
    'api/comments',
    body,
  )
}

export const useArtCommentMutation = () => {
  return useMutation({
    mutationKey: ['create-comment'],
    mutationFn: (args: CommentArtCreateInput) => createArtComment(args),
  })
}
