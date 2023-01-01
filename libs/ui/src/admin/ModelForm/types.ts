import { StrapiTranslatableCreateInput, StrapiUrl } from '@wsvvrijheid/types'
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

export type ModelCreateFormProps<D extends StrapiTranslatableCreateInput> = {
  url: StrapiUrl
  fields: {
    name: keyof D
    label?: string
    url?: StrapiUrl
    // Todo: Add markdown support
    type?: 'text' | 'textarea' | 'select' | 'file' | 'date' | 'datetime-local'
    isMulti?: boolean
    isRequired?: boolean
  }[]
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
