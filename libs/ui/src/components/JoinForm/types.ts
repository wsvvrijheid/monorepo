import { Job, Project, StrapiLocale } from '@wsvvrijheid/types'

export type JoinFormFieldValues = {
  name: string
  email: string
  phone: string
  availableHours: number
  occupation: string
  comment: string
  inMailingList: boolean
  isPublic: boolean
  heardFrom: HeardFrom[]
  jobs: Job[]
}

export type JoinFormFProps = {
  jobs: Job[]
  projects: Project[]
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
