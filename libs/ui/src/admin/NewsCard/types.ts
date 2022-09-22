import { News } from '@wsvvrijheid/types'

export type NewsCardProps = {
  news: News
  userId?: string
  variant?: 'horizontal' | 'vertical'
  hideDescription: boolean
}
