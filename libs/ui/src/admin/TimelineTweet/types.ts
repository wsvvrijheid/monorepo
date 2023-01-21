import { StackProps } from '@chakra-ui/react'
import { TimelineTweet } from '@wsvvrijheid/types'

import { ModelImageProps } from '../ModelForm/ModelImage'

export type TimelineUser = {
  name?: string
  username: string
  profile?: string
}

export type TimelineTweetProps = {
  tweet: TimelineTweet
  user: TimelineUser
  onSave?: (data: TimelineLocalTweet) => void
  onEdit?: (data: TimelineLocalTweet) => void
} & StackProps

export type TimelineLocalTweet = Pick<TimelineTweetProps, 'tweet' | 'user'>

export type TweetContentProps = Partial<
  Pick<ModelImageProps, 'isChangingImage' | 'setIsChangingImage' | 'setValue'>
> & {
  tweet: TimelineTweet
  isVertical?: boolean
}
