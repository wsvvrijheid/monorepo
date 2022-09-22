import { ReactElement } from 'react'

import { ButtonProps } from '@chakra-ui/react'
import { News } from '@wsvvrijheid/types'

export type NewsCardBaseProps = {
  hideDescription?: boolean
  news: News
  variant?: 'horizontal' | 'vertical'
  isBookmarked: boolean
  onBookmark: (id: string) => void
  onShare: (id: string) => void
  onRecommend: () => void
  onView: (url: string) => void
}

export type ActionButtonProps = {
  onClick: () => void
  title: string
  icon: ReactElement
  isVertical?: boolean
} & ButtonProps
