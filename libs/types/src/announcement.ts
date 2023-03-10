import { Category } from './category'
import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase, StrapiCreatorRelation, StrapiEntityBase } from './strapi'
import { Tag } from './tag'

type AnnouncementBase = StrapiEntityBase & {
  date: string
}

type AnnouncementRelation = {
  categories?: Array<Category>
  tags?: Array<Tag>
  image?: UploadFile
  localizations?: Array<Announcement>
}

type AnnouncementRelationInput = {
  categories?: Array<number>
  tags?: Array<number>
  image?: File
}

export type AnnouncementCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    AnnouncementBase,
    'approvalStatus'
  > &
    AnnouncementRelationInput
>
export type AnnouncementUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<
    Omit<AnnouncementBase, 'locale'> & AnnouncementRelationInput
  >
>
export type AnnouncementLocalizeInput = Pick<
  AnnouncementBase,
  'title' | 'description' | 'content'
>

export type Announcement = StrapiBase &
  AnnouncementBase &
  AnnouncementRelation &
  StrapiCreatorRelation
