import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase } from './strapi'
import { Tweet } from './tweet'
import { User } from './user'

export type RecommendedTweetBase = {
  isShared: boolean
  isArchived: boolean
  text: string
}

type RecommendedTweetRelation = {
  recommender: User
  media: UploadFile
  originalTweet: Tweet
}

type RecommendedTweetRelationInput = {
  recommender: number
  media: Blob[] | Blob
  originalTweet: JSON
}

export type RecommendedTweetCreateInput = Expand<
  { publishedAt?: string | null } & Omit<
    RecommendedTweetBase,
    'isShared' | 'isArchived'
  > &
    RecommendedTweetRelationInput
>

export type RecommendedTweet = StrapiBase &
  RecommendedTweetBase &
  RecommendedTweetRelation
