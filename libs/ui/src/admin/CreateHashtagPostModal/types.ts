import { QueryKey } from '@tanstack/react-query'

export type CreateHashtagPostFormFieldValues = {
  title: string
  description: string
  content: string
  hashtag: { value: string; label: string }
  reference: string
  image: File
  creator: number
}

export type CreateHashtagPostModalProps = {
  queryKey?: QueryKey
}

export type CreateHashtagPostSuccessAlertProps = {
  isOpen: boolean
  onClose: () => void
}
