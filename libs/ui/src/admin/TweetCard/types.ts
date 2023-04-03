import { StackProps } from '@chakra-ui/react'

import { Tweet } from '@wsvvrijheid/types'

import { TweetContentProps } from '../TweetContent'

export type TweetCardProps = {
  tweet: Tweet
  originalTweet?: Tweet
  bookmarkable?: boolean
  editable?: boolean
} & TweetContentProps &
  StackProps
