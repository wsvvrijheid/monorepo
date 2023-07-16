import { ButtonProps, ModalProps } from '@chakra-ui/react'
import {
  Control,
  FieldErrorsImpl,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form'
import { AnyObjectSchema } from 'yup'

import { RoleType, StrapiCollectionUrl, StrapiModel } from '@wsvvrijheid/types'

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
    | 'mediaUrl'
}

type FormSelectFields = {
  type: 'select'
  isMulti?: boolean
  url: StrapiCollectionUrl
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
  url: StrapiCollectionUrl
  fields: FormFields<T>
  model?: Partial<T>
  schema: AnyObjectSchema
  buttonProps?: ButtonProps
  hideLanguageSwitcher?: boolean
  onSuccess?: () => void
  allowedRoles?: RoleType[]
}
export type ModelCreateFormBodyProps<T extends StrapiModel> = {
  fields: FormFields<T>
  activeOption?: string
  formProps: UseFormReturn
  model?: Partial<T>
  isChangingImage: boolean
  setIsChangingImage: {
    on: () => void
    off: () => void
    toggle: () => void
  }
}

export type ModelEditFormProps<T extends StrapiModel> = {
  url: StrapiCollectionUrl
  model: T
  translatedFields?: (keyof T)[]
  fields: FormFields<T>
  schema: AnyObjectSchema
  hideLanguageSwitcher?: boolean
  noColumns?: boolean
  onSuccess: () => void
  onClose?: () => void
  approverRoles?: RoleType[]
  removerRoles?: RoleType[]
  editorRoles?: RoleType[]
  publisherRoles?: RoleType[]
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
  url: StrapiCollectionUrl
  control: Control
  tooltip?: string
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
}

export type Option = { value: string | number; label: string }
