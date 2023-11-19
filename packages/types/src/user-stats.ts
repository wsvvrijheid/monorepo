import { Profile } from './profile'
import { StrapiBase } from './strapi'

export type UserStatsBase = StrapiBase & {
  date: string
  approvedActivity: number
  approvedApplication: number
  approvedBlog: number
  approvedCollection: number
  approvedCompetition: number
  approvedHashtag: number
  approvedPost: number
  approvedTotal: number
  createdActivity: number
  createdApplication: number
  createdBlog: number
  createdCollection: number
  createdCompetition: number
  createdHashtag: number
  createdPost: number
  createdTotal: number
  createdRecommendedTopic: number
  createdRecommendedTweet: number
}

type UserStatsRelation = {
  profile: Pick<Profile, 'id' | 'name' | 'email'>
}

export type UserStats = UserStatsBase & UserStatsRelation
