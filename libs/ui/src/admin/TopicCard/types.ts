import { ReactElement } from 'react'

import { ButtonProps } from '@chakra-ui/react'
import { TopicBase } from '@wsvvrijheid/types'

export type TopicCardProps = {
  topic: TopicBase
  onCreatePost?: (topic: TopicBase) => void
}
export type ActionButtonProps = {
  onClick: () => void
  title: string
  icon: ReactElement
  isVertical?: boolean
} & ButtonProps
