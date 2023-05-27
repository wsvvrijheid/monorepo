import { Merge } from 'type-fest'

import {
  StrapiLocale,
  StrapiTranslatableModel,
  TranslatableModel,
} from '@wsvvrijheid/types'

export type TranslateModalProps<T extends StrapiTranslatableModel> = {
  onApprove: (Id: number, content: string) => void
  isOpen: boolean
  onClose: () => void
  onSave: (data: string) => void
  model: TranslatableModel<T>
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
