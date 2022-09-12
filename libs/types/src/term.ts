import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'

export type Term = Expand<
  StrapiCore & {
    title: string
    slug: string
    content: string
    locale: StrapiLocale
    image?: UploadFile
    localizations?: Array<Term>
  }
>
