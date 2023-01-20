import { RecommendedTweet } from '@wsvvrijheid/types'

export type RecommendedTweetCardProps = {
  tweet: RecommendedTweet
  key: number
}
export type RecommenderType =
  | {
      name: string
      username: string
      profile: string
      blocked?: boolean
      confirmed?: boolean
      email?: boolean
      provider?: string
      updatedAt?: string
    }
  | undefined
