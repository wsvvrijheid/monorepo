import { StackProps } from '@chakra-ui/react'
// import { Tweet } from '@wsvvrijheid/types'

export type TimelineTweetProps = {
  tweet: TimelineTweet
  username: string
  profileImg: string
  onSave?: (tweet: TimelineTweet) => void
  onEdit?: (tweet: TimelineTweet) => void
} & StackProps

export type TimelineTweet = {
  id: string
  text: string
  media?: {
    type: string
    media_key: string
    url?: string
    preview_image_url?: string
  }
  created_at?: string
}
