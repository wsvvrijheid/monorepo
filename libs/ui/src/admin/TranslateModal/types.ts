import {
  StrapiAllModels,
  StrapiLocale,
  StrapiTranslatableModel,
  UploadFile,
} from '@wsvvrijheid/types'
import { Merge } from 'type-fest'

// Only title, description and locale is required for all models
// We can use publishedAt in case the model doesn't have status property
export type DefaultTranslatableModel<T extends StrapiTranslatableModel> = {
  id: number
  title: string
  description: string
  locale: StrapiLocale
  publishedAt: string | null
  content?: string
  text?: string
  image?: UploadFile
  images?: UploadFile[]
  approvalStatus?: StrapiAllModels['approvalStatus']
  localizations?: T[]
}

export type TranslatableModel<T extends StrapiTranslatableModel> = Omit<
  DefaultTranslatableModel<T>,
  'localizations'
>

export type TranslateModalProps<T extends StrapiTranslatableModel> = {
  onApprove: (Id: number, content: string) => void
  isOpen: boolean
  onClose: () => void
  onSave: (data: string) => void
  model: DefaultTranslatableModel<T>
}

export type TranslationKey = [StrapiLocale, StrapiLocale]

export type TranslateAccordionItemProps<T extends StrapiTranslatableModel> =
  Merge<
    TranslatableModel<T>,
    {
      missingTranslations?: StrapiLocale[]
      handleTranslate: (key: TranslationKey) => void
    }
  >

export type LocalizedModel<T extends StrapiTranslatableModel> = Record<
  StrapiLocale,
  TranslatableModel<T>
>

export type TranslateFormProps<T extends StrapiTranslatableModel> = {
  translationKey: TranslationKey
  localizedModels: LocalizedModel<T>
}
