import { TopicBase } from '@wsvvrijheid/types'

export type TopicCardProps = {
  topic: TopicBase
  userId: number
  variant?: 'horizontal' | 'vertical'
  hideDescription: boolean
  isLoading: boolean | undefined
}
