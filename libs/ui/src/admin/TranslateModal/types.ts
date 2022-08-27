import { MergedStrapiModel, StrapiLocale } from '@wsvvrijheid/types'
import { Merge, SetOptional } from 'type-fest'

export type TranslateModalProps<T extends MergedStrapiModel> = {
  onApprove: (Id: number, content: string) => void
  isOpen: boolean
  onClose: () => void
  onSave: (data: string) => void
  model: T
}

// Only title, description and locale is required for all models
// We can use publishedAt in case the model doesn't have status property
export type TranslateModel = SetOptional<
  Pick<
    MergedStrapiModel,
    | 'title'
    | 'description'
    | 'content'
    | 'locale'
    | 'status'
    | 'image'
    | 'images'
    | 'localizations'
    | 'publishedAt'
  >,
  'image' | 'images' | 'content' | 'status' | 'localizations'
>

export type TranslatePreviewItemProps = Merge<
  Omit<TranslateModel, 'localizations'>,
  {
    missingTranslations?: Locales[]
    handleTranslate: (key: TranslationKey) => void
  }
>

export enum Locales {
  en = 'en',
  nl = 'nl',
}

export type TranslationKey = `${StrapiLocale}-${Locales}`

export type TranslateAccordionProps = {
  handleTranslate: (key: TranslationKey) => void
  models: Omit<TranslatePreviewItemProps, 'handleTranslate'>[]
}
