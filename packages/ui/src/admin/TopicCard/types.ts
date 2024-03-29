import { ReactElement } from 'react'

import { ButtonProps } from '@chakra-ui/react'

import { TopicBase } from '@fc/types'

export type TopicCardProps = {
  topic: TopicBase
  onCreatePost?: (topic: TopicBase) => void
}
export type ActionButtonProps = {
  onClick: () => void
  title: string
  icon: ReactElement
} & ButtonProps
