import { TimelineTweet } from '@wsvvrijheid/types'

export type CreateTweetFormProps = {
  onSubmit: (text: string, originalTweet: TimelineTweet, media?: File) => void
  onClose: () => void
  isOpen: boolean
  originalTweet: TimelineTweet
}
