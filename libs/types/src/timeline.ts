import { Expand } from './common'
import { StrapiCore } from './strapi'
import { Tweet } from './tweet'
import { TweetUserData } from './tweet-user'
import { User } from './user'

export type TimelineBase = {
  username: string
  userData: TweetUserData
}

type TimelineRelation = {
  tweets: Tweet[]
  creator?: User
  listers?: User[]
}

export type TimelineCreateInput = Omit<TimelineBase, 'userData'>

export type Timeline = Expand<StrapiCore & TimelineBase & TimelineRelation>
