import { Topic } from '@wsvvrijheid/types'

export type TopicCardProps = {
  news: Topic
  userId: number
  variant?: 'horizontal' | 'vertical'
  hideDescription: boolean
}
