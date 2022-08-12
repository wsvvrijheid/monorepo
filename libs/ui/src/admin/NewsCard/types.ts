import { ReactElement } from 'react'

import { ButtonProps } from '@chakra-ui/react'
import { News } from '@wsvvrijheid/types'

export type NewsCardProps = {
  isFeatured?: boolean
  news: News
  variant?: 'horizontal' | 'vertical'
}

export type ActionButtonProps = {
  onClick: () => void
  title: string
  icon: ReactElement
  isVertical?: boolean
} & ButtonProps
