import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiBase } from './strapi'

export type Term = Expand<
  StrapiBase & {
    title: string
    slug: string
    content: string
    locale: StrapiLocale
    image?: UploadFile
    localizations?: Array<Term>
  }
>
