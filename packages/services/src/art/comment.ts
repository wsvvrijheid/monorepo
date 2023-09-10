import { Mutation } from '@wsvvrijheid/lib'
import {
  Comment,
  CommentArtCreateInputPublic,
  CommentArtCreateInputUser,
} from '@wsvvrijheid/types'
type CreateArtCommentProps = {
  content: string
  name?: string
  email?: string
  art: number
  user?: number
  token: string
}

export const createArtComment = ({
  content,
  name,
  email,
  art,
  user,
  token,
}: CreateArtCommentProps) => {
  if (user) {
    const body = { content, art, user }

    return Mutation.post<Comment, CommentArtCreateInputUser>(
      'comments',
      body,
      token,
    )
  }

  if (!name || !email) {
    throw new Error('Name or email is required')
  }

  const body = { content, name, email, art }

  return Mutation.post<Comment, CommentArtCreateInputPublic>(
    'comments',
    body,
    token,
  )
}
