import { QueryKey } from '@tanstack/react-query'

export type CreateMainHashtagFormFieldValues = {
  title: string
  description: string
  content: string
  hashtag: string
  extrahashtag?: string
  date: string
  mentions?: {
    label: string
    value: string
  }[]
}

export type CreateMainHashtagModalProps = {
  queryKey?: QueryKey
}

export type CreateMainHashtagSuccessAlertProps = {
  isOpen: boolean
  onClose: () => void
}
