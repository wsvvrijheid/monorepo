import { ButtonProps, ModalProps } from '@chakra-ui/react'
import {
  Control,
  FieldErrorsImpl,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form'
import { AssertsShape, OptionalObjectSchema } from 'yup/lib/object'

import { Role, StrapiModel, StrapiUrl } from '@wsvvrijheid/types'

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
  type?:
    | 'boolean'
    | 'date'
    | 'datetime-local'
    | 'file'
    | 'markdown'
    | 'number-input'
    | 'text'
    | 'textarea'
    | 'mediaUrl'
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
  group?: { value: string; label: string; name: string }
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
  hideLanguageSwitcher?: boolean
  onSuccess?: () => void
}
export type ModelCreateFormBodyProps<T extends StrapiModel> = {
  fields: FormFields<T>
  activeOption?: string
  formProps: UseFormReturn<AssertsShape<any>, any>
  model?: Partial<T>
}

export type ModelEditFormProps<T extends StrapiModel> = {
  url: StrapiUrl
  model: T
  translatedFields?: (keyof T)[]
  fields: FormFields<T>
  schema: OptionalObjectSchema<any>
  hideLanguageSwitcher?: boolean
  noColumns?: boolean
  onSuccess: () => void
  onClose?: () => void
  approverRoles?: Role['type'][]
  removerRoles?: Role['type'][]
  editorRoles?: Role['type'][]
  publisherRoles?: Role['type'][]
}

export type ModelEditModalProps<T extends StrapiModel> = Omit<
  ModalProps,
  'id' | 'children'
> &
  Omit<ModelEditFormProps<T>, 'model' | 'onSuccess'> & {
    title: string
    id: number
    isOpen: boolean
    isFullHeight?: boolean
    onClose: () => void
    maxW?: string
  }

export type ModelSelectProps = WSelectProps<FieldValues> & {
  url: StrapiUrl
  control: Control<AssertsShape<any>, any>
  tooltip?: string
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
}

export type Option = { value: string | number; label: string }
