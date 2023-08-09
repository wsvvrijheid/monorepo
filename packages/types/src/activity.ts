import { Category } from './category'
import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase, StrapiCreatorRelation, StrapiEntityBase } from './strapi'
import { Tag } from './tag'

type ActivityBase = StrapiEntityBase & {
  date: string
  forKunsthalte:boolean
  forLotus:boolean
}

type ActivityRelation = {
  categories?: Array<Category>
  tags?: Array<Tag>
  image?: UploadFile
  localizations?: Array<Activity>
}

type ActivityRelationInput = {
  categories?: number
  tags?: Array<number>
  image: File
}

export type ActivityCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    ActivityBase,
    'approvalStatus'
  > &
    ActivityRelationInput
>
export type ActivityUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<
    Omit<ActivityBase, 'locale'>
  > &
    Omit<ActivityRelationInput, 'image'> & { image?: File }
>
export type ActivityLocalizeInput = Pick<
  ActivityBase,
  'title' | 'description' | 'content'
>

export type Activity = StrapiBase &
  ActivityBase &
  ActivityRelation &
  StrapiCreatorRelation
