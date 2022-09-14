import { Expand, TranslationStatus } from './common'
import { UploadFile } from './file'
import { Hashtag } from './hashtag'
import { StrapiBase, StrapiEntityBase } from './strapi'
import { Tag } from './tag'
import { User } from './user'

export type PostBase = Expand<
  Omit<StrapiEntityBase, 'slug' | 'content'> & {
    content: string | null
    capsStatus: TranslationStatus
    twitterMedia?: string | null
  }
>

export type PostRelation = {
  image?: UploadFile
  hashtag?: Hashtag
  tags?: Array<Tag>
  translator?: User | null
  creator?: User | null
  reviewer?: User | null
  localizations?: Array<Post>
}

export type PostRelationInput = {
  image: Blob
  hashtag: number
  tags?: Array<number>
  translator?: number
  creator?: number
  reviewer?: number
}

export type PostCreateInput = Expand<
  Omit<PostBase, 'translationStatus' | 'capsStatus'> &
    Pick<PostRelationInput, 'image' | 'hashtag' | 'tags'>
>

export type PostUpdateInput = Expand<
  Partial<
    Omit<PostBase, 'locale'> & Omit<PostRelationInput, 'translator' | 'creator'>
  >
>

export type PostLocalizeInput = Pick<
  PostBase,
  'title' | 'description' | 'content' | 'translationStatus'
>

export type Post = Expand<StrapiBase & PostBase & PostRelation>
