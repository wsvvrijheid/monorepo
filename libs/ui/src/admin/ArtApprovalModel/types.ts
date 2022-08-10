import { Art, UploadFile } from '@wsvvrijheid/types'
import { User } from '@wsvvrijheid/types'

export type ArtApprovalFormTypes = {
  onReject: () => void
  onApprove: () => void
  onDelete: () => void
  onEdit: () => void
  art: Art
  user: User
  isOpen: boolean
  onOpen: boolean
}
export type ArtImageProps = {
  image: UploadFile
  alt: string
}
