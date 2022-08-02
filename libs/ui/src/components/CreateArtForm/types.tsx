import { RefObject } from 'react'

import { Category } from '@wsvvrijheid/types'

export type CreateArtFormFieldValues = {
  locale: string
  title: string
  description: string
  content: string
  categories: {
    label: string
    value: string
  }[]
}

export type CreateArtFormProps = {
  onCreateArt: (data: CreateArtFormFieldValues) => void
  isLoading: boolean
  isLoggedIn: boolean
  categories: Category[]
}

export type CreateArtSuccessAlertProps = {
  isOpen: boolean
  onClose: () => void
  ref: RefObject<HTMLButtonElement>
}
