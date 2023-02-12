import { Category } from './category'
import { Comment } from './comment'
import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase, StrapiCreatorRelation, StrapiEntityBase } from './strapi'
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
  image: File
  author?: number
  categories?: Array<number>
  tags?: Array<number>
  likers?: Array<number>
}

export type BlogCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    BlogBase,
    'approvalStatus' | 'likes' | 'views'
  > &
    Omit<BlogRelationInput, 'likers'> & { token: string }
>
export type BlogUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<
    Omit<BlogBase, 'locale'> & BlogRelationInput
  > & { token: string }
>

export type BlogLocalizeInput = Omit<
  BlogBase,
  'approvalStatus' | 'likes' | 'views'
>

export type Blog = StrapiBase & BlogBase & BlogRelation & StrapiCreatorRelation
