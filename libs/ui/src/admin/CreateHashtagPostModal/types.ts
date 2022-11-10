import { QueryKey } from '@tanstack/react-query'

export type CreateHashtagPostFormFieldValues = {
  title: string
  description: string
  content: string
  hashtag: string
  postsource: string
  image: Blob
  creator: number
}

export type CreateHashtagPostModalProps = {
  queryKey?: QueryKey
}

export type CreateHashtagPostSuccessAlertProps = {
  isOpen: boolean
  onClose: () => void
}
