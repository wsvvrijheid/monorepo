import { Art, Profile, SessionUser } from '@wsvvrijheid/types'

export type ArtApprovalTypes = {
  art: Art
  artist?: Profile
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
