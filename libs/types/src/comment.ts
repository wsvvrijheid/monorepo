import { Art } from './art'
import { Blog } from './blog'
import { Expand, PickRequired } from './common'
import { StrapiCore } from './strapi'
import { User } from './user'

export type CommentBase = {
  content: string
  name?: string | null
  email?: string | null
}

type CommentRelation = {
  user?: User
  blog?: Blog
  art?: Art
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

export type Comment = Expand<StrapiCore & CommentBase & CommentRelation>
