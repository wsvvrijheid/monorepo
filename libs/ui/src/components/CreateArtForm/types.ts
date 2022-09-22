import { Auth, StrapiLocale } from '@wsvvrijheid/types'

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
  auth: Auth
}

export type CreateArtSuccessAlertProps = {
  isOpen: boolean
  onClose: () => void
}
