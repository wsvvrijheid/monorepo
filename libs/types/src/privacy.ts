import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'

export type Privacy = Expand<
  StrapiCore & {
    title: string
    slug: string
    content: string
    locale: StrapiLocale
    image?: UploadFile
    localizations?: Array<Privacy>
  }
>
