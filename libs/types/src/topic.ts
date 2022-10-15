import { StrapiLocale } from './locale'

export type TopicBase = {
  url: string
  title?: string
  description?: string
  category?: string
  image?: string
  time?: string
  locale: StrapiLocale
  publisher: string
}

export type Topic = {
  isRecommended: boolean
} & TopicBase
