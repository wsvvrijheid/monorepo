import { StrapiBase } from './strapi'
import { TimelineTweet } from './tweet'
import { User } from './user'

export type TimelineBase = {
  userData: {
    name: string
    username: string
    profile: string
  }
}

type TimelineRelation = {
  tweets: Array<TimelineTweet>
  creator?: User
  listers?: Array<User>
}

export type TimelineCreateInput = Omit<
  { publishedAt?: Date | string | null } & TimelineBase,
  'userData'
>

export type Timeline = StrapiBase & TimelineBase & TimelineRelation
