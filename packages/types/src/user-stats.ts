import { StrapiBase } from './strapi'
import { User } from './user'

export type UserStatsApproves = {
  activity: number
  total: number
  announcement: number
  application: number
  blog: number
  collection: number
  competition: number
  hashtag: number
  post: number
}

export type UserStatsCreations = UserStatsApproves & {
  recommendedTopic: number
  recommendedTweet: number
}

export type UserStatsData = {
  approves: UserStatsApproves
  creations: UserStatsCreations
}

export type UserStatsBase = StrapiBase & {
  date: string
  count: number
  stats: UserStatsData
}

type UserStatsRelation = {
  user: Pick<User, 'id' | 'name' | 'username'>
}

export type UserStats = UserStatsBase & UserStatsRelation
