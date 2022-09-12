import { Category } from './category'
import { Expand, TranslationStatus } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'
import { Tag } from './tag'

type ActivityBase = {
  title: string
  slug: string
  description: string
  content: string
  translationStatus: TranslationStatus
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
  image: Blob
}

export type ActivityCreateInput = Expand<
  Omit<ActivityBase, 'translationStatus'> & ActivityRelationInput
>
export type ActivityUpdateInput = Expand<
  Partial<Omit<ActivityBase, 'locale'>> & ActivityRelationInput
>
export type ActivityLocalizeInput = Pick<
  ActivityBase,
  'title' | 'description' | 'content'
>

export type Activity = Expand<StrapiCore & ActivityBase & ActivityRelation>
