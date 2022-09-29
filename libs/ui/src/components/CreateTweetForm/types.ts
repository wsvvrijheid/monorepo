import { Tweet } from '@wsvvrijheid/types'

export type CreateTweetFormProps = {
  image: string
  onSubmit: (tweet: string) => void
  onClose: () => void
  isOpen: boolean
  images: Array<Blob>
  setImages: React.Dispatch<React.SetStateAction<Blob[]>>
  originalTweet: Tweet
}
