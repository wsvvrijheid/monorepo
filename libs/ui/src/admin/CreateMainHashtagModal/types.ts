import { QueryKey } from '@tanstack/react-query'
import { MentionBase } from '@wsvvrijheid/types'

export type CreateMainHashtagFormFieldValues = {
  title: string
  description: string
  content: string
  hashtag: string
  extrahashtag?: string
  date: string
  mentions?: number[]
}

export type CreateMainHashtagModalProps = {
  queryKey?: QueryKey
  mentions: MentionBase
}

export type CreateMainHashtagSuccessAlertProps = {
  isOpen: boolean
  onClose: () => void
}
