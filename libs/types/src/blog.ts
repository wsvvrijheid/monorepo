import { Author } from './author'
import { Category } from './category'
import { Comment } from './comment'
import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase, StrapiEntityBase } from './strapi'
import { Tag } from './tag'
import { User } from './user'

export type BlogBase = Expand<
  StrapiEntityBase & {
    likes: number
    views: number
  }
>

type BlogRelation = {
  image?: UploadFile
  author?: Author
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
  Omit<BlogBase, 'translationStatus' | 'likes' | 'views'> &
    Omit<BlogRelationInput, 'likers'>
>
export type BlogUpdateInput = Expand<
  Partial<Omit<BlogBase, 'locale'> & BlogRelationInput>
>

export type BlogLocalizeInput = Omit<
  BlogBase,
  'approvalStatus' | 'likes' | 'views'
>

export type Blog = Expand<StrapiBase & BlogBase & BlogRelation>
