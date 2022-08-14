import { UploadFile } from '@wsvvrijheid/types'

export type ArtApprovalTypes = {
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
  artImages: UploadFile[] | string[]
  onClose: () => void
  artistName: string
  feedback: string
  artistAvatar: string
  onSave: (artDescription: string) => void
  setIsEditing: (data: boolean) => void
  isEditing: boolean
}

export type ArtFeedbackFormTypes = {
  onReject: (artId: number, editorId: number, feedback: string) => void
  onApprove: (artId: number, editorId: number, feedback: string) => void
  onDelete: (artId: number) => void
  artId: number
  editorId: number
  editorAvatar: string
  editorName: string
  artDescription: string
  setIsEditing: (data: boolean) => void
}
