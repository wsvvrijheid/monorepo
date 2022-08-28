import { UploadFile } from './file'
import { StrapiCore } from './strapi'
import { Tweet } from './tweet'
import { User } from './user'

export type RecommendedTweet = {
  recommender: User
  originalTweet: Tweet
  isShared: boolean
  isArchived: boolean
  media: UploadFile
  text: string
} & StrapiCore
