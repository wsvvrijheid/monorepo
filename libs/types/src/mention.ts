import { Category } from './category'
import { Hashtag } from './hashtag'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'

export type Mention = {
  username: string
  data: any
  locale: StrapiLocale
  categories?: Array<Category>
  hashtags?: Array<Hashtag>
  localizations?: Array<Mention>
} & StrapiCore
