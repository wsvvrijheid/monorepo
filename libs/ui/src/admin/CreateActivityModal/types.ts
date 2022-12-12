import { QueryKey } from '@tanstack/react-query'

export type CreateActivityFormFieldValues = {
  title: string
  description: string
  content: string
  image: File
  creator: number
  date: string
}

export type CreateActivityModalProps = {
  queryKey?: QueryKey
}

export type CreateActivitySuccessAlertProps = {
  isOpen: boolean
  onClose: () => void
}
