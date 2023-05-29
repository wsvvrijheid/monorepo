import { Expand } from './common'
import { UploadFile } from './file'
import { Mention } from './mention'
import { StrapiBase, StrapiCreatorRelation } from './strapi'
import { Tweet } from './tweet'

export type RecommendedTweetBase = {
  isShared: boolean
  text: string
  videoUrl?: string
}

type RecommendedTweetRelation = {
  video?: UploadFile
  image?: UploadFile
  caps?: UploadFile
  originalTweet: Tweet
  mentions: Mention[]
}

type RecommendedTweetRelationInput = {
  video?: File
  image?: File
  caps?: File
  originalTweet?: JSON
  mentions?: number[]
}

export type RecommendedTweetCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    RecommendedTweetBase,
    'isShared' | 'videoUrl'
  > &
    RecommendedTweetRelationInput
>

export type RecommendedTweet = StrapiBase &
  RecommendedTweetBase &
  RecommendedTweetRelation &
  StrapiCreatorRelation
