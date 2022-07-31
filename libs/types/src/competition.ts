import { Application } from './application'
import { Category } from './category'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'

export type Competition = {
  title: string
  slug: string
  description: string
  content: string
  image?: UploadFile
  date: string
  dateEnd: string
  locale: StrapiLocale
  applications?: Array<Application>
  categories?: Array<Category>
  localizations?: Array<Competition>
} & StrapiCore
