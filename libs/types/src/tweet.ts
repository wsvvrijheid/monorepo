export type TweetUserBase = {
  name: string
  username: string
  profile: string
}

export interface Tweet {
  id: string
  user: TweetUserBase
  image?: string
  video?: string
  text: string
  createdAt?: string
  likes?: number
  retweets?: number
  replies?: number
  impressions?: number
}
