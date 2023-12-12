import { Expand } from './common'
import { StrapiBase } from './strapi'

export type PresentationBase = {
  slug: string
  title_en: string
  title_nl: string
  title_tr: string
  name_en: string
  name_nl: string
  name_tr: string
  description_en: string
  description_nl: string
  description_tr: string
  content_en: string
  content_nl: string
  content_tr: string
  date: string
  address: string
}

export type PresentationUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<PresentationBase>
>

export type Presentation = StrapiBase & PresentationBase
