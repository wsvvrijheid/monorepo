import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'

export type Privacy = {
  title: string
  slug: string
  content: string
  locale: StrapiLocale
  image?: UploadFile
  localizations?: Array<Privacy>
} & StrapiCore
