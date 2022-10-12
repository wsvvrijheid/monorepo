import { QueryKey } from '@tanstack/react-query'

export type CreateCollectionFormFieldValues = {
  title: string
  description: string
}

export type CreateCollectionModalProps = {
  queryKey?: QueryKey
}

export type CreateCollectionSuccessAlertProps = {
  isOpen: boolean
  onClose: () => void
}
