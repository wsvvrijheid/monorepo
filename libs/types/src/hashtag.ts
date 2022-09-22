import { SetOptional, SetRequired } from 'type-fest'

import { Category } from './category'
import { Expand } from './common'
import { UploadFile } from './file'
import { Mention } from './mention'
import { Post } from './post'
import { StrapiBase, StrapiEntityBase } from './strapi'
import { Tweet } from './tweet'

export type HashtagBase = StrapiEntityBase & {
  hashtag: string
  hashtagExtra: string | null
  date: string
  tweets: Array<Tweet> | null
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
  { publishedAt?: string | null } & SetOptional<
    Omit<HashtagBase, 'translationStatus' | 'tweets'>,
    'hashtagExtra'
  > &
    SetRequired<HashtagRelationInput, 'image'>
>

export type HashtagUpdateInput = Expand<
  { publishedAt?: string | null } & Partial<Omit<HashtagBase, 'locale'>> &
    HashtagRelationInput
>

export type HashtagLocalizeInput = Pick<
  HashtagBase,
  'title' | 'description' | 'content' | 'translationStatus'
>

export type Hashtag = StrapiBase & HashtagBase & HashtagRelation
