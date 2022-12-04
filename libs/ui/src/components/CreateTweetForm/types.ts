import { Tweet } from '@wsvvrijheid/types'

export type CreateTweetFormProps = {
  image: string
  onSubmit: (text: string, originalTweet: Tweet, media?: File) => void
  onClose: () => void
  isOpen: boolean
  media: File[]

  originalTweet: Tweet
}
