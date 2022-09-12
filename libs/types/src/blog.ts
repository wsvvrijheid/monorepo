import { Author } from './author'
import { Category } from './category'
import { Comment } from './comment'
import { Expand, TranslationStatus } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'
import { Tag } from './tag'
import { User } from './user'

export type BlogBase = {
  title: string
  slug: string
  description: string | null
  content: string
  translationStatus: TranslationStatus
  locale: StrapiLocale
  likes: number | null
  views: number
}

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
  image?: Blob
  author?: number
  categories?: Array<number>
  tags?: Array<number>
  likers?: Array<number>
}

export type BlogCreateInput = Expand<
  Omit<BlogBase, 'translationStatus' | 'likes' | 'views'> & BlogRelationInput
>
export type BlogUpdateInput = Expand<Partial<BlogBase> & BlogRelationInput>

export type BlogLocalizeInput = Pick<
  BlogBase,
  'title' | 'description' | 'content'
>

export type Blog = Expand<StrapiCore & BlogBase & BlogRelation>
