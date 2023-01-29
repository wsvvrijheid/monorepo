import { SetOptional, SetRequired } from 'type-fest'

import { Category } from './category'
import { Expand } from './common'
import { UploadFile } from './file'
import { Mention } from './mention'
import { Post } from './post'
import { StrapiBase, StrapiCreatorRelation, StrapiEntityBase } from './strapi'
import { Tweet } from './tweet'

export type HashtagBase = StrapiEntityBase & {
  hashtagDefault: string
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
  image?: File
  posts?: Array<number>
  categories?: Array<number>
  mentions?: Array<number>
}

export type HashtagCreateInput = Expand<
  { publishedAt?: Date | string | null } & SetOptional<
    Omit<HashtagBase, 'approvalStatus' | 'tweets'>,
    'hashtagExtra'
  > &
    SetRequired<HashtagRelationInput, 'image'> & { token: string }
>

export type HashtagUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<
    Omit<HashtagBase, 'locale' | 'tweets'>
  > &
    HashtagRelationInput & { token: string }
>

export type HashtagLocalizeInput = Pick<
  HashtagBase,
  'title' | 'description' | 'content' | 'approvalStatus'
>

export type Hashtag = StrapiBase &
  HashtagBase &
  HashtagRelation &
  StrapiCreatorRelation
