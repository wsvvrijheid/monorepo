import { SetRequired } from 'type-fest'

import { Category } from './category'
import { Expand, ModelStatus } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'
import { Tag } from './tag'

type ActivityBase = {
  title: string
  slug: string
  description: string | null
  content: string
  status: ModelStatus
  date: string
  locale: StrapiLocale
}

type ActivityRelation = {
  categories?: Array<Category>
  tags?: Array<Tag>
  image?: UploadFile
  localizations?: Array<Activity>
}

type ActivityRelationInput = {
  category?: number
  tags?: number[]
  image?: Blob
}

export type ActivityCreateInput = Expand<
  Omit<ActivityBase, 'status'> & SetRequired<ActivityRelationInput, 'image'>
>
export type ActivityUpdateInput = Expand<
  Partial<Omit<ActivityBase, 'locale'>> & ActivityRelationInput
>
export type ActivityLocalizeInput = Pick<
  ActivityBase,
  'title' | 'description' | 'content'
>

export type Activity = Expand<StrapiCore & ActivityBase & ActivityRelation>
