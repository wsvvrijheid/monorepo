import { User } from '@wsvvrijheid/types'
export type CommentFormFieldValues = {
  email?: string
  name?: string
  content: string
}
type Auth = {
  user: User
  isLoggedIn: boolean
  token: string
}
export type CommentFormProps = {
  errorMessage?: string
  auth?: Auth
  isLoading: boolean
  onSendForm: (data: CommentFormFieldValues) => void
}
