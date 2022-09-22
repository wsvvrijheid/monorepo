import { News } from '@wsvvrijheid/types'

export type NewsCardProps = {
  news: News
  userId?: number
  variant?: 'horizontal' | 'vertical'
  hideDescription: boolean
}
