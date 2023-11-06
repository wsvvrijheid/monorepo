import { InferType } from 'yup'

import { Platform, StrapiLocale } from '@wsvvrijheid/types'

import { joinSchema } from './schema'

export type JoinFormFieldValues = InferType<ReturnType<typeof joinSchema>>

export type JoinFormProps = {
  platforms: Platform[]
  isLoading: boolean
  onSubmitHandler: (data: JoinFormFieldValues) => void
}

//  !!  {[key in StrapiLocale]?:string} for   optinal
export type HeardFrom = {
  label: Record<StrapiLocale, string>
  value: string
  selected: boolean
}
