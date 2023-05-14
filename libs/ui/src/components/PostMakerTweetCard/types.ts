import { PostState } from '@wsvvrijheid/store'

export type PostMakerTweetShareProps = {
  url: string
  content: string
}

export type PostMakerTweetTagsProps = {
  mentions: string[]
  trends: string[]
  onMentionClick: (mention: string) => void
  onTrendClick: (trend: string) => void
}

export type PostMakerTweetCardProps = {
  post: PostState
  onAddMention: (mention: string) => void
  onAddTrend: (mention: string) => void
  toggleMentionsModal: () => void
  toggleTrendsModal: () => void
}
