import { RefObject } from 'react'

import { StrapiLocale } from '@wsvvrijheid/types'

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
  isLoggedIn: boolean
  isLoading: boolean
  cancelRef: RefObject<HTMLButtonElement>
  formDisclosure: {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
  }
}

export type CreateArtSuccessAlertProps = {
  isOpen: boolean
  onClose: () => void
}
