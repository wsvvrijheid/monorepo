import { Profile } from './profile'
import { StrapiBase } from './strapi'

export type UserStatsApproves = {
  activity: number
  total: number
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
  profile: Pick<Profile, 'id' | 'name' | 'username'>
}

export type UserStats = UserStatsBase & UserStatsRelation
