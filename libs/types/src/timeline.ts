import { StrapiCore } from './strapi'
import { Tweet } from './tweet'
import { TweetUserData } from './tweet-user'
import { User } from './user'

export type Timeline = {
  username: string
  userData: TweetUserData
  tweets: Tweet[]
  creator?: User
  listers?: User[]
} & StrapiCore
