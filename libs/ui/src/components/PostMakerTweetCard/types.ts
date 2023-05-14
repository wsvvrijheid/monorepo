import { PostState } from '@wsvvrijheid/store'

export type PostMakerTweetShareProps = {
  url: string
  content: string
}

export type PostMakerTweetCardProps = {
  post: PostState
  onMentionClick: (mention: string) => void
  onTrendClick: (mention: string) => void
  toggleMentionsModal: () => void
  toggleTrendsModal: () => void
}

export type PostMakerTweetTagsProps = Pick<
  PostMakerTweetCardProps,
  'onMentionClick' | 'onTrendClick'
> & {
  mentions: string[]
  trends: string[]
}

export type PostMakerTweetButtonsProps = Pick<
  PostMakerTweetCardProps,
  'post' | 'toggleMentionsModal' | 'toggleTrendsModal'
>
