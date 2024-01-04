import { Category } from './category'
import { Comment } from './comment'
import { Expand } from './common'
import { UploadFile } from './file'
import { Profile } from './profile'
import { StrapiBase, StrapiCreatorRelation, StrapiEntityBase } from './strapi'
import { Tag } from './tag'

export type BlogBase = StrapiEntityBase & {
  likes: number
  views: number
}

type BlogRelation = {
  image?: UploadFile | null
  author?: Profile | null
  categories?: Array<Category>
  tags?: Array<Tag>
  likers?: Array<Profile>
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
    Omit<BlogRelationInput, 'likers'>
>
export type BlogUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<
    Omit<BlogBase, 'locale'> & BlogRelationInput
  >
>

export type BlogLocalizeInput = Omit<
  BlogBase,
  'approvalStatus' | 'likes' | 'views'
>

export type Blog = StrapiBase & BlogBase & BlogRelation & StrapiCreatorRelation
