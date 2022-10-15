import { ReactElement } from 'react'

import { ButtonProps } from '@chakra-ui/react'
import { Topic } from '@wsvvrijheid/types'

export type TopicCardBaseProps = {
  hideDescription?: boolean
  topic: Topic
  variant?: 'horizontal' | 'vertical'
  isBookmarked: boolean | undefined
  isLoading: boolean | undefined
  onBookmark: () => void
  onShare: () => void
  onRecommend: () => void
  onView: () => void
}

export type ActionButtonProps = {
  onClick: () => void
  title: string
  icon: ReactElement
  isVertical?: boolean
} & ButtonProps
