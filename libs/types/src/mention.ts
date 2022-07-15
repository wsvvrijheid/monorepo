import { Category, RawCategory } from './category'
import { Hashtag, RawHashtag } from './hashtag'
import { StrapiCollection, StrapiRawCollection } from './strapi'

export type RawMention = {
  id: number
  username: string
  data: any
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  categories: StrapiRawCollection<RawCategory>
  hashtags: StrapiRawCollection<RawHashtag>
  localizations: StrapiRawCollection<RawMention>
}

export type Mention = {
  id: number
  username: string
  data: any
  locale: string
  categories: StrapiCollection<Category>
  hashtags: StrapiCollection<Hashtag>
  localizations: StrapiCollection<Mention>
  createdAt: string
  updatedAt: string
  publishedAt: string
}
