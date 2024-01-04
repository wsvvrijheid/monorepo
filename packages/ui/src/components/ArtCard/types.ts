import { ThemeTypings } from '@chakra-ui/react'

import { Art, StrapiLocale, UploadFile } from '@wsvvrijheid/types'

export type ArtActionType = 'delete' | 'publish' | 'unpublish'

export type ArtActionContext = {
  buttonText: string
  colorScheme: ThemeTypings['colorSchemes']
  text: string
  title: string
  onClick: () => void
}

export type ArtActions = Record<ArtActionType, ArtActionContext>

export type ArtCardProps = {
  art: Art
  isMasonry?: boolean
  isModal?: boolean
  onToggleLike?: () => void
}

export type ArtCardBaseProps = {
  actions?: ArtActions
  art: Art
  isLiked?: boolean
  isMasonry?: boolean
  isOwner?: boolean
  isModal?: boolean
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
  locale: StrapiLocale
}

export type CardImageProps = { image?: UploadFile | null } & ArtCardImageProps
