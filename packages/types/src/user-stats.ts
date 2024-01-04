import { Profile } from './profile'
import { StrapiBase } from './strapi'

export type UserStatsData = {
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

export type UserStatsBase = StrapiBase &
  UserStatsData & {
    date: string
  }

type UserStatsRelation = {
  profile: Pick<Profile, 'id' | 'name' | 'email'> | null
}

export type UserStats = UserStatsBase & UserStatsRelation
