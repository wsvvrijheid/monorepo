import { QueryKey } from '@tanstack/react-query'
import { Auth } from '@wsvvrijheid/types'

export type CreateCollectionFormFieldValues = {
  title: string
  description: string
}

export type CreateCollectionModalProps = {
  auth: Auth
  queryKey?: QueryKey
}

export type CreateCollectionSuccessAlertProps = {
  isOpen: boolean
  onClose: () => void
}
