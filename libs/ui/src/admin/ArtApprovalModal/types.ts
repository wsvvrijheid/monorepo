import { UploadFile } from '@wsvvrijheid/types'

export type ArtApprovalTypes = {
  artDescription: string
  artId: number
  artImages: UploadFile[] | string[]
  artTitle: string
  artistAvatar: string
  artistName: string
  editorAvatar: string
  editorId: number
  editorName: string
  isOpen: boolean
  onApprove: (artId: number, editorId: number, feedback: string) => void
  onClose: () => void
  onDelete: (artId: number) => void
  onReject: (artId: number, editorId: number, feedback: string) => void
  onSave: (artDescription: string) => void
  onPublish: () => void
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
  onPublish: () => void
}
