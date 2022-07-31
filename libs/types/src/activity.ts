import { Category } from './category'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'
import { Tag } from './tag'

export type Activity = {
  content: string
  date: string
  description: string | null
  locale: StrapiLocale
  slug: string
  title: string
  image?: UploadFile
  categories?: Array<Category>
  tags?: Array<Tag>
  localizations?: Array<Activity>
} & StrapiCore
