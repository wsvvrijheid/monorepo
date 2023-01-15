import { StrapiModel, StrapiModelKeys, StrapiUrl } from '@wsvvrijheid/types'
import { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'
import { AssertsShape, OptionalObjectSchema } from 'yup/lib/object'

import { WSelectProps } from '../../components'
import { ModelImageProps } from './ModelImage'

export type MentionSelectProps = {
  isEditing: boolean
  control: Control<AssertsShape<any>, any>
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
}

type FormTextFields = {
  type?: 'text' | 'textarea' | 'markdown' | 'date' | 'datetime-local' | 'file'
}

type FormSelectFields = {
  type: 'select'
  isMulti?: boolean
  url: StrapiUrl
  fields: StrapiModelKeys[]
}

type FormCommonFields<T extends StrapiModel> = {
  name: keyof T
  label?: string
  isRequired?: boolean
}

export type FormFields<T extends StrapiModel> = Array<
  | (FormTextFields & FormCommonFields<T>)
  | (FormSelectFields & FormCommonFields<T>)
>

export type ModelCreateFormProps<T extends StrapiModel> = {
  url: StrapiUrl
  fields: FormFields<T>
  model?: Partial<T>
  schema: OptionalObjectSchema<any>
  onSuccess?: () => void
} & Pick<ModelImageProps, 'isChangingImage'>

export type ModelEditFormProps<T extends StrapiModel> = {
  url: StrapiUrl
  model: T
  translatedFields: (keyof T)[]
  fields: FormFields<T>
  schema: OptionalObjectSchema<any>
  onSuccess: () => void
}

export type ModelSelectProps<T extends StrapiModel> =
  WSelectProps<FieldValues> & {
    url: StrapiUrl
    fields?: (keyof T)[]
    control: Control<AssertsShape<any>, any>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
  }

export type Option = { value: string | number; label: string }
