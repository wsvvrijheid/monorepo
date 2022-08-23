import { UploadFile } from '@wsvvrijheid/types'

export type TranslateModalTypes = {
  onApprove: (Id: number, content: string) => void
  isOpen: boolean
  onClose: () => void
  onSave: (data: string) => void
  mode: 'preview' | 'edit'
}

export type TranslateFormTypes = {}
