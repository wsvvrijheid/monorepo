import { RefObject } from 'react'

import { Category, StrapiLocale } from '@wsvvrijheid/types'

export type CreateArtFormFieldValues = {
  locale: StrapiLocale
  title: string
  description: string
  content: string
  categories: {
    label: string
    value: string
  }[]
}

export type CreateArtFormProps = {
  onCreateArt: (data: CreateArtFormFieldValues & { images: Blob[] }) => void
  isLoading: boolean
  isLoggedIn: boolean
  categories: Category[]
}

export type CreateArtSuccessAlertProps = {
  isOpen: boolean
  onClose: () => void
  ref: RefObject<HTMLButtonElement>
}
