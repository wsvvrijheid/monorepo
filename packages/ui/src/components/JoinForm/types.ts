import { Job, Platform, StrapiLocale } from '@wsvvrijheid/types'

export type JoinFormFieldValues = {
  name: string
  age: number
  city: string
  email: string
  phone: string
  availableHours: number
  occupation: string
  comment: string
  inMailingList: boolean
  isPublic: boolean
  heardFrom: HeardFrom[]
  // TODO: Confirm this is the correct type
  jobs: number[]
}

export type JoinFormFProps = {
  jobs: Job[]
  platforms: Platform[]
  isLoading: boolean
  locale: StrapiLocale
  onSubmitHandler: (data: JoinFormFieldValues) => void
}

//  !!  {[key in StrapiLocale]?:string} for   optinal
export type HeardFrom = {
  label: Record<StrapiLocale, string>
  value: string
  selected: boolean
}
