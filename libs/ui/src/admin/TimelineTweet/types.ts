import { StackProps } from '@chakra-ui/react'
import { TimelineTweet } from '@wsvvrijheid/types'

import { ModelImageProps } from '../ModelForm/ModelImage'
// import { Tweet } from '@wsvvrijheid/types'

export type TimelineTweetProps = {
  tweet: TimelineTweet
  user?: {
    name: string
    username: string
    profile: string
  }
  onSave?: (data: TimelineLocalTweet) => void
  onEdit?: (data: TimelineLocalTweet) => void
} & StackProps

export type TimelineLocalTweet = Pick<TimelineTweetProps, 'tweet' | 'user'>
export type TweetTextProps = Partial<
  Pick<ModelImageProps, 'isChangingImage' | 'setIsChangingImage' | 'setValue'>
> & {
  tweet: TimelineTweet
  isVertical?: boolean
}
