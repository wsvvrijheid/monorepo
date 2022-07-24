export type ResetPasswordFieldValues = {
  password: string
  passwordConfirmation: string
}

export type ResetPasswordFormProps = {
  onSubmitHandler: (data: ResetPasswordFieldValues) => void
  isLoading?: boolean
}
