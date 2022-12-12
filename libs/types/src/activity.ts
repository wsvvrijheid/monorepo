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
  image: File
}

export type ActivityCreateInput = Expand<
  { publishedAt?: string | null } & Omit<ActivityBase, 'approvalStatus'> &
    ActivityRelationInput
>
export type ActivityUpdateInput = Expand<
  { publishedAt?: string | null } & Partial<Omit<ActivityBase, 'locale'>> &
    Omit<ActivityRelationInput, 'image'> & { image?: File }
>
export type ActivityLocalizeInput = Pick<
  ActivityBase,
  'title' | 'description' | 'content'
>

export type Activity = StrapiBase & ActivityBase & ActivityRelation
