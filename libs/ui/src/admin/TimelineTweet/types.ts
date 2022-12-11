import { StackProps } from '@chakra-ui/react'
import { TimelineTweet } from '@wsvvrijheid/types'
// import { Tweet } from '@wsvvrijheid/types'

export type TimelineTweetProps = {
  tweet: TimelineTweet
  user: {
    name: string
    username: string
    profile: string
  }
  onSave?: (
    tweet: TimelineTweet,
    user: {
      name: string
      username: string
      profile: string
    },
  ) => void
  onEdit?: (
    tweet: TimelineTweet,
    user: {
      name: string
      username: string
      profile: string
    },
  ) => void
} & StackProps
