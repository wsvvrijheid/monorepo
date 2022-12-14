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
  onSave?: (data: TimelineLocalTweet) => void
  onEdit?: (data: TimelineLocalTweet) => void
} & StackProps

export type TimelineLocalTweet = Pick<TimelineTweetProps, 'tweet' | 'user'>
