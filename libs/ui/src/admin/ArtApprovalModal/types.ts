import { Art, SessionUser, User } from '@wsvvrijheid/types'

export type ArtApprovalTypes = {
  art: Art
  artist?: User
  editor: SessionUser
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export type ArtFeedbackFormTypes = {
  art: Art
  editor: SessionUser
  onClose: () => void
  onSuccess?: () => void
  setIsEditing: (isEditing: boolean) => void
}
