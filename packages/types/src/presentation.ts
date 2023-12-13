import { Expand } from './common'
import { StrapiBase } from './strapi'

export type PresentationBase = {
  slug: string
  title: string
  name: string
  description: string
  content: string
  date: string
  address: string
}

export type PresentationUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<PresentationBase>
>

export type Presentation = StrapiBase & PresentationBase
