import { UploadFile } from '@wsvvrijheid/types'

export type ArtApprovalTypes = {
  artDescription: string
  artContent: string
  artId: number
  artImage: UploadFile | string
  artTitle: string
  artistAvatar: string
  artistName: string
  editorAvatar: string
  editorId: number
  editorName: string
  artApprovalStatus: string
  artPublishedAt: string | null
  isOpen: boolean
  onApprove: (artId: number, editorId: number, feedback: string) => void
  onClose: () => void
  onDelete: (artId: number) => void
  onReject: (artId: number, editorId: number, feedback: string) => void
  onSave: (
    artId: number,
    data: string,
    updateValue: 'content' | 'description',
  ) => void
  onPublish: (artId: number) => void
  unPublish: (artId: number) => void
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
  artApprovalStatus: string
  artPublishedAt: string | null
  updateField: (data: string) => void
  onPublish: (artId: number) => void
  unPublish: (artId: number) => void
}
