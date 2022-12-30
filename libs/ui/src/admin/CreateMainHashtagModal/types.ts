import { QueryKey } from '@tanstack/react-query'

export type CreateMainHashtagFormFieldValues = {
  title: string
  description: string
  content: string
  hashtagDefault: string
  hashtagExtra?: string
  date: string
  mentions?: {
    label: string
    value: string
  }[]
}

export type CreateMainHashtagModalProps = {
  queryKey?: QueryKey
}
