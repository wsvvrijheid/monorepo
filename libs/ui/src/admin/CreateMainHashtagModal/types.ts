import { QueryKey } from '@tanstack/react-query'

export type CreateMainHashtagFormFieldValues = {
  title: string
  description: string
}

export type CreateMainHashtagModalProps = {
  queryKey?: QueryKey
}

export type CreateMainHashtagSuccessAlertProps = {
  isOpen: boolean
  onClose: () => void
}
