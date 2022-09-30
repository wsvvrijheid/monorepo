import { StrapiBase } from './strapi'
import { Tweet } from './tweet'
import { TweetUserData } from './tweet-user'
import { User } from './user'

export type TimelineBase = {
  username: string
  userData: TweetUserData
}

type TimelineRelation = {
  tweets: Array<Tweet>
  creator?: User
  listers?: Array<User>
}

export type TimelineCreateInput = Omit<
  { publishedAt?: string | null } & TimelineBase,
  'userData'
>

export type Timeline = StrapiBase & TimelineBase & TimelineRelation
