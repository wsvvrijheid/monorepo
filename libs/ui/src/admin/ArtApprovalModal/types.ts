import { Art } from '@wsvvrijheid/types'

export type ArtApprovalTypes = {
  art: Art
  artistAvatar: string
  artistName: string
  editorAvatar: string
  editorName: string
  isOpen: boolean
  onApprove: (artId: number, feedback: string) => void
  onClose: () => void
  onDelete: (artId: number) => void
  onPublish: (artId: number) => void
  onReject: (artId: number, feedback: string) => void
  unPublish: (artId: number) => void
  onSave: (
    artId: number,
    data: string,
    updateValue: 'description' | 'title',
  ) => void
}

export type ArtFeedbackFormTypes = {
  art: Art
  editorAvatar: string
  editorName: string
  onApprove: (artId: number, feedback: string) => void
  onDelete: (artId: number) => void
  onPublish: (artId: number) => void
  onReject: (artId: number, feedback: string) => void
  unPublish: (artId: number) => void
  updateField: (data: string) => void
}
