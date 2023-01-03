import { Expand } from './common'
import { UploadFile } from './file'
import { Mention } from './mention'
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
  mentions: Mention[]
}

type RecommendedTweetRelationInput = {
  recommender: number
  media?: File[] | File
  originalTweet: JSON
  mentions: number[]
}

export type RecommendedTweetCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    RecommendedTweetBase,
    'isShared' | 'isArchived'
  > &
    RecommendedTweetRelationInput
>

export type RecommendedTweet = StrapiBase &
  RecommendedTweetBase &
  RecommendedTweetRelation
