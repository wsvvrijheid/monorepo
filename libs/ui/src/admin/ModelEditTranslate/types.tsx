import { ButtonProps } from '@chakra-ui/react'
import { StrapiModel, StrapiUrl } from '@wsvvrijheid/types'
import { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'
import { AssertsShape, OptionalObjectSchema } from 'yup/lib/object'

import { WSelectProps } from '../../components'

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
  buttonProps?: ButtonProps
  onSuccess?: () => void
}

export type ModelEditTranslateProps<T extends StrapiModel> = {
  url: StrapiUrl
  targetModel: T
  currentModel: T
  translatedFields: (keyof T)[]
  fields: FormFields<T>
  schema: OptionalObjectSchema<any>
  onSuccess: () => void
}

export type ModelSelectProps = WSelectProps<FieldValues> & {
  url: StrapiUrl
  control: Control<AssertsShape<any>, any>
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
}

export type Option = { value: string | number; label: string }
