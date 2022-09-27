export type CreateTweetFormProps = {
  title: string
  image: string
  onSubmitHandler: () => void
  onClose: () => void
  isOpen: boolean
  setImages: React.Dispatch<React.SetStateAction<Blob[]>>
  maxSize?: number
  images: Array<Blob>
  tweetContent: string
  tweetImage: string
}
