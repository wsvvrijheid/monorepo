import { Category } from './category'
import { ModelStatus } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'
import { Tag } from './tag'

export type Announcement = {
  title: string
  slug: string
  description: string
  content: string
  status: ModelStatus
  image?: UploadFile
  date: string
  categories?: Array<Category>
  tags?: Array<Tag>
  locale: StrapiLocale
  localizations?: Array<Announcement>
} & StrapiCore
