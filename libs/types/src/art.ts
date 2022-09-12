import { SetOptional } from 'type-fest'

import { ArtFeedback } from './art-feedback'
import { Artist } from './artist'
import { Category } from './category'
import { Collection } from './collection'
import { Comment } from './comment'
import { Expand, ModelStatus } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'
import { Tag } from './tag'
import { User } from './user'

type ArtBase = {
  title: string
  slug: string
  description: string | null
  content: string
  status: ModelStatus
  locale: StrapiLocale
  isApproved: boolean | null
  isRejected: boolean | null
  likes: number | null
  views: number | null
}

type ArtRelation = {
  artist?: Artist
  categories?: Array<Category>
  collection?: Collection | null
  comments?: Array<Comment>
  feedbacks?: Array<ArtFeedback>
  images?: Array<UploadFile>
  likers?: Array<User>
  locale: StrapiLocale
  localizations?: Array<Art>
  tags?: Array<Tag>
}

type ArtRelationInput = {
  artist?: number
  categories?: Array<number>
  collection?: number
  comments?: Array<number>
  feedbacks?: Array<number>
  images?: Array<Blob>
  likers?: Array<number>
  tags?: Array<number>
}

export type ArtCreateInput = Expand<
  SetOptional<
    Omit<ArtBase, 'status'>,
    'isApproved' | 'isRejected' | 'views' | 'likes'
  > &
    ArtRelationInput
>

export type ArtUpdateInput = Expand<
  Partial<Omit<ArtBase, 'locale'>> & ArtRelationInput
>

export type ArtLocalizeInput = Pick<
  ArtBase,
  'title' | 'description' | 'content' | 'locale'
>

export type Art = Expand<StrapiCore & ArtBase & ArtRelation>
