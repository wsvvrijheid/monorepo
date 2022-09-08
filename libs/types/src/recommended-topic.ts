import { User } from './user'

export type RecommendedTopic = {
  title: string
  description: string
  imageUrl: string
  link: string
  publisher: string
  recommended: boolean
  skipped: boolean
  posted: boolean
  recommender?: User
}
