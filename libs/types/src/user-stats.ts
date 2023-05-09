import { StrapiBase } from './strapi'
import { User } from './user'

export type UserStatsBase = StrapiBase & {
  date: string
  count: number
  type: 'creator' | 'approver'
}

type UserStatsRelation = {
  user: User
}

export type UserStats = UserStatsBase & UserStatsRelation
