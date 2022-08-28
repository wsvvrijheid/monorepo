import { Category } from './category'
import { ModelStatus } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'
import { Tag } from './tag'

export type Activity = {
  title: string
  slug: string
  description: string | null
  content: string
  status: ModelStatus
  image?: UploadFile
  date: string
  categories?: Array<Category>
  tags?: Array<Tag>
  locale: StrapiLocale
  localizations?: Array<Activity>
} & StrapiCore
