import { ComponentProps } from 'react'

import { Button } from '@chakra-ui/react'
import { QueryKey } from '@tanstack/react-query'
import { Art, SessionUser, UploadFile } from '@wsvvrijheid/types'

export type ArtActionType = 'delete' | 'publish' | 'unpublish'

export type ArtActionContext = {
  buttonText: string
  colorScheme: ComponentProps<typeof Button>['colorScheme']
  text: string
  title: string
  onClick: () => void
}

export type ArtActions = Record<ArtActionType, ArtActionContext>

export type ArtCardProps = {
  art: Art
  user: SessionUser | null
  queryKey?: QueryKey
}

export type ArtCardBaseProps = {
  actions?: ArtActions
  art: Art
  isLiked?: boolean
  isMasonry?: boolean
  isOwner?: boolean
  toggleLike?: () => void
}

export type ArtCardAlertDialogProps = {
  isOpen: boolean
  onClose: () => void
} & ArtActionContext

export type ArtCardActionsProps = {
  isPublished: boolean
  onHandleAction: (type: ArtActionType) => void
}

export type ArtCardImageProps = {
  art: Art
  isMasonry?: boolean
}

export type CardImageProps = { image?: UploadFile } & ArtCardImageProps
