export interface Tweet {
  media?: any
  id: string
  user: {
    name: string
    username: string
    profile: string
  }
  image?: string
  videos?: {
    bitrate?: number
    content_type: string
    url: string
  }[]
  text: string
  likes: number
  retweets: number
}

export type TimelineTweet = {
  id: string
  text: string
  description?: string
  media?: {
    type: string
    media_key: string
    url?: string
    preview_image_url?: string
  }
  created_at?: string
}
