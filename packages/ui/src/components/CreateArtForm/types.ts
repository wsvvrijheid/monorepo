import { QueryKey } from '@tanstack/react-query'

export type CreateArtFormFieldValues = {
  title: string
  description: string
  categories: {
    label: string
    value: string
  }[]
}

export type CreateArtFormProps = {
  queryKey?: QueryKey
}

export type CreateArtSuccessAlertProps = {
  isOpen: boolean
  onClose: () => void
}
