import { ReactElement } from 'react'

import { ButtonProps } from '@chakra-ui/react'
import { Art } from '@wsvvrijheid/types'

export type ArtAddToCollectionCardProps = {
  isAdded: boolean
  art: Art
  onAdd: () => void
  onRemove: () => void
}

export type MutationButtonProps = {
  onClick: () => void
  title: string
  icon: ReactElement
  colorScheme: string
  variant: string
} & ButtonProps
