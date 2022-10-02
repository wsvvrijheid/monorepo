export type CommentFormFieldValues = {
  email?: string
  name?: string
  content: string
}

export type CommentFormProps = {
  errorMessage?: string
  isLoading: boolean
  isSuccess: boolean
  onSendForm: (data: CommentFormFieldValues) => void
}
