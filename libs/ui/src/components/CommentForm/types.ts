import { Auth } from '@wsvvrijheid/types'

export type CommentFormFieldValues = {
  email?: string
  name?: string
  content: string
}

export type CommentFormProps = {
  errorMessage?: string
  auth?: Auth
  isLoading: boolean
  isSuccess: boolean
  onSendForm: (data: CommentFormFieldValues) => void
}
