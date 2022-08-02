import { User } from '@wsvvrijheid/types'

export type CreateArtFormFieldValues = {
  locale: string
  title: string
  description: string
  content: string
  categories: {
    label: string
    value: string
  }
}
type Auth = {
  user: User
  isLoggedIn: boolean
  token: string
}
export type CreateArtFormProps = {
  onCreateArt: (data: CreateArtFormFieldValues) => void
  errorMessage?: string
  auth: Auth
  onCreateArtMutation: any
}
