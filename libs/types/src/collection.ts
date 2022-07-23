import { Art } from './art'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'

export type Collection = {
  title: string
  slug: string
  description: string
  locale: StrapiLocale
  image?: UploadFile | null
  arts?: Array<Art>
  localizations?: Array<Collection>
} & StrapiCore
