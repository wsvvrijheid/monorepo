import { Topic } from '@wsvvrijheid/types'

export type TopicCardProps = {
  topic: Topic
  userId: number
  variant?: 'horizontal' | 'vertical'
  hideDescription: boolean
  isLoading: boolean | undefined
  onTopicRecommended: () => void
}
