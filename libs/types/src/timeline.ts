import { StrapiBase } from './strapi'
import { Tweet } from './tweet'
import { User } from './user'

export type TimelineBase = {
  userData: {
    name: string
    username: string
    profile: string
  }
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
