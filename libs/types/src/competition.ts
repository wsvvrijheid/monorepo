import { Application } from './application'
import { Category } from './category'
import { ModelStatus } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'

export type Competition = {
  title: string
  slug: string
  description: string
  content: string
  status: ModelStatus
  image?: UploadFile
  date: string
  deadline: string
  locale: StrapiLocale
  applications?: Array<Application>
  categories?: Array<Category>
  localizations?: Array<Competition>
} & StrapiCore
