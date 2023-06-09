import { Post } from '@wsvvrijheid/types'

export type PostMakerTweetShareProps = {
  url: string
  content: string
  isAdminMode: boolean
}

export type PostMakerTweetButtonsProps = {
  post: Post
  content: string
  onTweet: () => void
}

export type PostMakerTweetListProps = {
  posts: Post[]
  isAdminMode: boolean
  isIosSafari: boolean
}
