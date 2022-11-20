import { StackProps } from '@chakra-ui/react'
import { Tweet } from '@wsvvrijheid/types'

export type TweetBaseCardProps = {
  tweet: Tweet
  onSave?: (tweet: Tweet) => void
  onEdit?: (tweet: Tweet) => void
} & StackProps
