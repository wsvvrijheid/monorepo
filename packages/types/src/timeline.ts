import { Profile } from './profile'
import { StrapiBase } from './strapi'
import { Tweet, TweetUserBase } from './tweet'

export type TimelineBase = StrapiBase & {
  username: string
}

type TimelineRelation = {
  userData: TweetUserBase
  tweets: Array<Omit<Tweet, 'user'>>
  creator?: Profile
  locale?: 'en' | 'nl' | 'tr'
}

export type TimelineCreateInput = Omit<
  { publishedAt?: Date | string | null },
  'userData'
>

export type Timeline = TimelineBase & TimelineRelation
