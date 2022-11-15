import { StackProps } from '@chakra-ui/react'
import { Tweet } from '@wsvvrijheid/types'

export type TweetBaseCardProps = {
  tweet: Tweet
  username: string
  profileImg: string
  onSave?: (tweet: Tweet) => void
  onEdit?: (tweet: Tweet) => void
} & StackProps
