import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase } from './strapi'
import { Tweet } from './tweet'
import { User } from './user'

export type RecommendedTweetBase = {
  isShared: boolean
  isArchived: boolean
  originalTweet: Tweet
  text: string
}

type RecommendedTweetRelation = {
  recommender: User
  media: UploadFile
}

type RecommendedTweetRelationInput = {
  recommender: number
  media: Blob[]
}

export type RecommendedTweetCreateInput = Expand<
  Omit<RecommendedTweetBase, 'isShared' | 'isArchived'> &
    RecommendedTweetRelationInput
>

export type RecommendedTweet = Expand<
  StrapiBase & RecommendedTweetBase & RecommendedTweetRelation
>
