import { UploadFile } from '@wsvvrijheid/types'

export type ArtApprovalFormTypes = {
  onReject: (artId: number, editorId: number, feedback: string) => void
  onApprove: (artId: number, editorId: number, feedback: string) => void
  onDelete: (artId: number) => void
  artId: number
  artTitle: string
  artDescription: string
  editorId: number
  editorName: string
  editorAvatar: string
  isOpen: boolean
  onOpen: () => void
  artImages: []
  onClose: () => void
  artArtistName: string
  isEdit: boolean
  feedback: string
}
export type ArtImageProps = {
  image: UploadFile
  alt: string
}
