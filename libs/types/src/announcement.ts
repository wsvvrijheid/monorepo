import { Category } from './category'
import { Expand, ModelStatus } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'
import { Tag } from './tag'

type AnnouncementBase = {
  title: string
  slug: string
  description: string
  content: string
  status: ModelStatus
  date: string
  locale: StrapiLocale
}

type AnnouncementRelation = {
  categories?: Array<Category>
  tags?: Array<Tag>
  image?: UploadFile
  localizations?: Array<Announcement>
}

type AnnouncementRelationInput = {
  categories?: number[]
  tags?: number[]
  image?: Blob
}

export type AnnouncementCreateInput = Expand<
  Omit<AnnouncementBase, 'status'> & AnnouncementRelationInput
>
export type AnnouncementUpdateInput = Expand<
  Partial<Omit<AnnouncementBase, 'locale'>> & AnnouncementRelationInput
>
export type AnnouncementLocalizeInput = Pick<
  AnnouncementBase,
  'title' | 'description' | 'content'
>

export type Announcement = Expand<
  StrapiCore & AnnouncementBase & AnnouncementRelation
>
