import { ButtonProps } from '@chakra-ui/react'
import { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'
import { ObjectSchema } from 'yup'

import {
  Role,
  RoleType,
  StrapiModel,
  StrapiTranslatableModel,
  StrapiUrl,
} from '@wsvvrijheid/types'

import { WSelectProps } from '../../components'

export type MentionSelectProps = {
  isEditing: boolean
  control: Control
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
}

type FormTextFields = {
  type?:
    | 'boolean'
    | 'date'
    | 'datetime-local'
    | 'file'
    | 'markdown'
    | 'number-input'
    | 'text'
    | 'textarea'
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
  schema: ObjectSchema<any>
  buttonProps?: ButtonProps
  onSuccess?: () => void
}

export type ModelEditTranslateProps<T extends StrapiTranslatableModel> = {
  id: number
  url: StrapiUrl
  translatedFields: (keyof T)[]
  fields: FormFields<T>
  schema: ObjectSchema<any>
  approverRoles?: RoleType[]
  editorRoles?: RoleType[]
}

export type ModelSelectProps = WSelectProps<FieldValues> & {
  url: StrapiUrl
  control: Control
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
}

export type Option = { value: string | number; label: string }
