import { UploadFile } from '@wsvvrijheid/types'

export type ArtApprovalTypes = {
  artDescription: string
  artId: number
  artImage: UploadFile | string
  artTitle: string
  artistAvatar: string
  artistName: string
  editorAvatar: string
  editorName: string
  artApprovalStatus: string
  artPublishedAt: string | null
  isOpen: boolean
  onApprove: (artId: number, feedback: string) => void
  onClose: () => void
  onDelete: (artId: number) => void
  onReject: (artId: number, feedback: string) => void
  onSave: (
    artId: number,
    data: string,
    updateValue: 'description' | 'title',
  ) => void
  onPublish: (artId: number) => void
  unPublish: (artId: number) => void
}

export type ArtFeedbackFormTypes = {
  onReject: (artId: number, feedback: string) => void
  onApprove: (artId: number, feedback: string) => void
  onDelete: (artId: number) => void
  artId: number
  editorAvatar: string
  editorName: string
  artDescription: string
  artApprovalStatus: string
  artPublishedAt: string | null
  updateField: (data: string) => void
  onPublish: (artId: number) => void
  unPublish: (artId: number) => void
}
