import { StrapiCore } from './strapi'
import { Tweet } from './tweet'
import { User } from './user'

export type SavedTweet = {
  tweet: Tweet
  username: string
  saver: User
} & StrapiCore
