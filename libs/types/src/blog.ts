import { Category } from './category'
import { Comment } from './comment'
import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase, StrapiEntityBase } from './strapi'
import { Tag } from './tag'
import { User } from './user'

export type BlogBase = StrapiEntityBase & {
  likes: number
  views: number
}

type BlogRelation = {
  image?: UploadFile
  author?: User
  categories?: Array<Category>
  tags?: Array<Tag>
  likers?: Array<User>
  comments?: Array<Comment>
  localizations?: Array<Blog>
}

type BlogRelationInput = {
  image: Blob
  author?: number
  categories?: Array<number>
  tags?: Array<number>
  likers?: Array<number>
}

export type BlogCreateInput = Expand<
  { publishedAt?: string | null } & Omit<
    BlogBase,
    'approvalStatus' | 'likes' | 'views'
  > &
    Omit<BlogRelationInput, 'likers'>
>
export type BlogUpdateInput = Expand<
  { publishedAt?: string | null } & Partial<
    Omit<BlogBase, 'locale'> & BlogRelationInput
  >
>

export type BlogLocalizeInput = Omit<
  BlogBase,
  'approvalStatus' | 'likes' | 'views'
>

export type Blog = StrapiBase & BlogBase & BlogRelation
