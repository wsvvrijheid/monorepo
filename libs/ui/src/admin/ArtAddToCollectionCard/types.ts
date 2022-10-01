import { ReactElement } from 'react'

import { ButtonProps } from '@chakra-ui/react'
import { Art } from '@wsvvrijheid/types'

export type ArtAddToCollectionCardProps = {
  isAdded: boolean
  isLoading: boolean
  art: Art
  onAdd: (art: Art) => void
  onRemove: (art: Art) => void
}

export type MutationButtonProps = {
  onClick: () => void
  title: string
  icon: ReactElement
  colorScheme: string
  variant: string
} & ButtonProps
