import { SetOptional, SetRequired } from 'type-fest'

import { Category } from './category'
import { Expand, TranslationStatus } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { Mention } from './mention'
import { Post } from './post'
import { StrapiCore } from './strapi'
import { Tweet } from './tweet'

export type HashtagBase = {
  title: string
  slug: string
  description: string | null
  content: string
  translationStatus: TranslationStatus
  hashtag: string
  hashtagExtra: string | null
  date: string
  locale: StrapiLocale
  tweets?: Array<Tweet> | null
}

type HashtagRelation = {
  image?: UploadFile
  posts?: Array<Post>
  categories?: Array<Category>
  mentions?: Array<Mention>
  localizations?: Array<Hashtag>
}

type HashtagRelationInput = {
  image?: Blob
  posts?: Array<number>
  categories?: Array<number>
  mentions?: Array<number>
}

export type HashtagCreateInput = Expand<
  SetOptional<
    Omit<HashtagBase, 'translationStatus' | 'tweets'>,
    'hashtagExtra'
  > &
    SetRequired<HashtagRelationInput, 'image' | 'mentions'>
>
export type HashtagUpdateInput = Expand<
  Partial<HashtagBase> & HashtagRelationInput
>

export type HashtagLocalizeInput = Pick<
  HashtagBase,
  'title' | 'description' | 'content'
>

export type Hashtag = Expand<StrapiCore & HashtagBase & HashtagRelation>
