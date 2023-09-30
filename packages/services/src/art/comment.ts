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
  profile?: number
  token: string
}

export const createArtComment = ({
  content,
  name,
  email,
  art,
  profile,
  token,
}: CreateArtCommentProps) => {
  if (!profile && !name && !email) {
    throw new Error('Profile, name or email is required')
  }

  const body = profile
    ? { content, art, profile }
    : { content, art, name, email }

  return Mutation.post<
    Comment,
    CommentArtCreateInputPublic | CommentArtCreateInputUser
  >('comments', body, token)
}
