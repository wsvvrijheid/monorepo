import { ApprovalStatus, Expand } from './common'
import { UploadFile } from './file'
import { Hashtag } from './hashtag'
import { StrapiBase, StrapiEntityBase } from './strapi'
import { Tag } from './tag'
import { User } from './user'

export type PostBase = Omit<StrapiEntityBase, 'slug'> & {
  capsStatus: ApprovalStatus
  twitterMedia?: string | null
  reference?: string | null
}

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
  { publishedAt?: string | null } & Omit<
    PostBase,
    'approvalStatus' | 'capsStatus'
  > &
    Pick<PostRelationInput, 'image' | 'hashtag' | 'tags'>
>

export type PostUpdateInput = Expand<
  { publishedAt?: string | null } & Partial<
    Omit<PostBase, 'locale'> & Omit<PostRelationInput, 'translator' | 'creator'>
  >
>

export type PostLocalizeInput = Pick<
  PostBase,
  'title' | 'description' | 'content' | 'approvalStatus'
>

export type Post = StrapiBase & PostBase & PostRelation
