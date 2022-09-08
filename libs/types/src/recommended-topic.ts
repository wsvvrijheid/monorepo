import { StrapiCore } from './strapi'
import { User } from './user'

export type RecommendedTopic = {
  title: string
  description: string
  imageUrl: string
  link: string
  publisher: string
  date: string
  skipped: boolean
  posted: boolean
  recommender?: User
} & StrapiCore
