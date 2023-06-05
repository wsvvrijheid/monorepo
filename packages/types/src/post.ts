import { ApprovalStatus, Expand, OgImageParams } from './common'
import { UploadFile } from './file'
import { Hashtag } from './hashtag'
import { StrapiBase, StrapiCreatorRelation, StrapiEntityBase } from './strapi'
import { Tag } from './tag'
import { User } from './user'

export type PostBase = Omit<StrapiEntityBase, 'slug'> & {
  capsStatus: ApprovalStatus
  twitterMedia?: string | null
  reference?: string | null
  imageParams?: OgImageParams
  videoUrl?: string
}

export type PostRelation = {
  image?: UploadFile
  video?: UploadFile
  caps?: UploadFile
  hashtag?: Hashtag
  tags?: Array<Tag>
  translator?: User | null
  localizations?: Array<Post>
}

export type PostRelationInput = {
  image: File
  video: File
  caps: File
  hashtag: number
  tags?: Array<number>
  translator?: number
}

export type PostCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    PostBase,
    'approvalStatus' | 'capsStatus' | 'videoUrl'
  > &
    Pick<PostRelationInput, 'image' | 'hashtag' | 'tags'>
>

export type PostUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<
    Omit<PostBase, 'locale'> & Omit<PostRelationInput, 'translator'>
  >
>

export type PostLocalizeInput = Pick<
  PostBase,
  'description' | 'content' | 'approvalStatus'
>

export type Post = StrapiBase & PostBase & PostRelation & StrapiCreatorRelation

export type PostSentence = {
  postId: number
  value: string
  index: number
  shareCount: number
  isPublished: boolean
}
