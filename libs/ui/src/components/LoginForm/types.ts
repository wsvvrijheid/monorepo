export type LoginFormFieldValues = {
  email: string
  password: string
}
export type LoginFormProps = {
  onSubmitHandler: (data: LoginFormFieldValues) => void
  errorMessage?: string
}
