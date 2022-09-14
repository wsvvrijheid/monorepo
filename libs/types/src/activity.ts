import { Category } from './category'
import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase, StrapiEntityBase } from './strapi'
import { Tag } from './tag'

type ActivityBase = Expand<
  StrapiEntityBase & {
    date: string
  }
>

type ActivityRelation = {
  categories?: Array<Category>
  tags?: Array<Tag>
  image?: UploadFile
  localizations?: Array<Activity>
}

type ActivityRelationInput = {
  category?: number
  tags?: Array<number>
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

export type Activity = Expand<StrapiBase & ActivityBase & ActivityRelation>
