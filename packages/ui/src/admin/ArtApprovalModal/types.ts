import { Art, Profile } from '@wsvvrijheid/types'

export type ArtApprovalTypes = {
  art: Art
  artist?: Profile | null
  editor: Profile
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export type ArtFeedbackFormTypes = {
  art: Art
  editor: Profile
  onClose: () => void
  onSuccess?: () => void
  setIsEditing: (isEditing: boolean) => void
}
