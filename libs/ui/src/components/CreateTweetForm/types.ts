import { Tweet } from '@wsvvrijheid/types'

export type CreateTweetFormProps = {
  image: string
  onSubmit: (tweet: string, media?: Blob[]) => void
  onClose: () => void
  isOpen: boolean
  media: Blob[]

  originalTweet: Tweet
}
