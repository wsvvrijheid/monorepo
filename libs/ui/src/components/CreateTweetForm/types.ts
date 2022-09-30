import { Tweet } from '@wsvvrijheid/types'

export type CreateTweetFormProps = {
  image: string
  onSubmit: (text: string, originalTweet: Tweet, media?: Blob) => void
  onClose: () => void
  isOpen: boolean
  media: Blob

  originalTweet: Tweet
}
