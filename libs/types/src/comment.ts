import { Art } from './art'
import { Blog } from './blog'
import { Expand, PickRequired } from './common'
import { StrapiBase } from './strapi'
import { User } from './user'

export type CommentBase = {
  content: string
  name?: string | null
  email?: string | null
  blocked?: boolean | null
}

type CommentRelation = {
  user?: User | null
  blog?: Blog | null
  art?: Art | null
}

type CommentRelationInput = {
  user?: number
  blog?: number
  art?: number
}

export type CommentArtCreateInputPublic = Expand<
  { content: string; name: string; email: string } & PickRequired<
    CommentRelationInput,
    'art'
  >
>
export type CommentArtCreateInputUser = Expand<
  Pick<CommentBase, 'content'> &
    PickRequired<CommentRelationInput, 'art' | 'user'>
>
export type CommentArtCreateInput = Expand<
  CommentArtCreateInputPublic | CommentArtCreateInputUser
>

export type CommentBlogCreateInputPublic = Expand<
  { content: string; name: string; email: string } & PickRequired<
    CommentRelationInput,
    'blog'
  >
>
export type CommentBlogCreateInputUser = Expand<
  Pick<CommentBase, 'content'> &
    PickRequired<CommentRelationInput, 'blog' | 'user'>
>
export type CommentBlogCreateInput = Expand<
  CommentBlogCreateInputPublic | CommentBlogCreateInputUser
>

export type Comment = Expand<StrapiBase & CommentBase & CommentRelation>
