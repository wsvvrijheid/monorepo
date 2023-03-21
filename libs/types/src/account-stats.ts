import { StrapiBase } from './strapi'

export type AccountStats = StrapiBase & {
  username: string
  followers: number
  tweets: number
  retweets: number
  likes: number
  followings: number
  replies: number
  date: number
}
