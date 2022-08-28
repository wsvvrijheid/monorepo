import { Art } from './art'
import { ModelStatus } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'

export type Collection = {
  title: string
  slug: string
  description: string
  status: ModelStatus
  image?: UploadFile | null
  arts?: Array<Art>
  locale: StrapiLocale
  localizations?: Array<Collection>
} & StrapiCore
