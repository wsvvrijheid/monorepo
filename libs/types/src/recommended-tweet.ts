import { Expand } from './common'
import { UploadFile } from './file'
import { Mention } from './mention'
import { StrapiBase } from './strapi'
import { Tweet } from './tweet'

export type RecommendedTweetBase = {
  isShared: boolean
  text: string
}

type RecommendedTweetRelation = {
  video: UploadFile
  image: UploadFile
  originalTweet: Tweet
  mentions: Mention[]
}

type RecommendedTweetRelationInput = {
  video?: File
  image?: File
  originalTweet?: JSON
  mentions?: number[]
}

export type RecommendedTweetCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    RecommendedTweetBase,
    'isShared'
  > &
    RecommendedTweetRelationInput
>

export type RecommendedTweet = StrapiBase &
  RecommendedTweetBase &
  RecommendedTweetRelation
