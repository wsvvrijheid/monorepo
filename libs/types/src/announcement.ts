import { Category } from './category'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'
import { Tag } from './tag'

export type Announcement = {
  title: string
  slug: string
  description: string
  content: string
  image?: UploadFile
  date: string
  dateEnd: string
  locale: StrapiLocale
  categories?: Array<Category>
  tags?: Array<Tag>
  localizations?: Array<Announcement>
} & StrapiCore
