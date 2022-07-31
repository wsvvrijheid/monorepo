export type ForgotPasswordFieldValues = {
  email: string
}

export type ForgotPasswordFormProps = {
  onSubmitHandler: (data: ForgotPasswordFieldValues) => void
  isLoading?: boolean
}
