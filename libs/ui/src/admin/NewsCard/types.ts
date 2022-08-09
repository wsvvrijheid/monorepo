import { News } from '@wsvvrijheid/types'
import { IconType } from 'react-icons'

export type NewsCardProps = {
  isFeatured?: boolean
  isVertical?: boolean
  news: News
}

export type ActionButtonProps = {
  onClick: () => void
  title: string
  icon: IconType
  isVertical?: boolean
}
