import { Category } from './category'
import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase, StrapiEntityBase } from './strapi'
import { Tag } from './tag'

type AnnouncementBase = Expand<
  StrapiEntityBase & {
    date: string
  }
>

type AnnouncementRelation = {
  categories?: Array<Category>
  tags?: Array<Tag>
  image?: UploadFile
  localizations?: Array<Announcement>
}

type AnnouncementRelationInput = {
  categories?: Array<number>
  tags?: Array<number>
  image: Blob
}

export type AnnouncementCreateInput = Expand<
  Omit<AnnouncementBase, 'translationStatus'> & AnnouncementRelationInput
>
export type AnnouncementUpdateInput = Expand<
  Partial<Omit<AnnouncementBase, 'locale'> & AnnouncementRelationInput>
>
export type AnnouncementLocalizeInput = Pick<
  AnnouncementBase,
  'title' | 'description' | 'content'
>

export type Announcement = Expand<
  StrapiBase & AnnouncementBase & AnnouncementRelation
>
