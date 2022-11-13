import { QueryKey } from '@tanstack/react-query'
import { Hashtag } from '@wsvvrijheid/types'

export type CreateMainHashtagFormFieldValues = {
  title: string
  description: string
  content: string
  hashtag: string
  hashtagExtra?: string
  date: string
  mentions?: {
    label: string
    value: string
  }[]
}

export type CreateMainHashtagModalProps = {
  queryKey?: QueryKey
  showEditModal: (respHashtag: Hashtag) => void
}

export type CreateMainHashtagSuccessAlertProps = {
  isOpen: boolean
  onClose: () => void
  handleClickRow: (hashtag?: Hashtag) => void
}
