import { Tweet } from '@wsvvrijheid/types'

export type CreateTweetFormProps = {
  onSubmit?: (
    text: string,
    originalTweet: Partial<Tweet>,
    mentions: number[],
    image?: File,
    video?: File,
  ) => void
  onClose: () => void
  isOpen: boolean
  originalTweet: Partial<Tweet>
  isNews: boolean
}
