import { StrapiBase } from './strapi'

export type AccountStatsBase = {
  username: string
  dataKey: string
  followers: number
  tweets: number
  retweets: number
  likes: number
  followings: number
  replies: number
  date: string
}

export type AccountStats = StrapiBase & AccountStatsBase
