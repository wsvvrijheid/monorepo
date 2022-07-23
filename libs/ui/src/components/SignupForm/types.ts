export type SignupFormFieldValues = {
  email: string
  password: string
  username: string
  name: string
}

export type SignupFormProps = {
  onhandleSubmitSignUp: (data: SignupFormFieldValues) => void
  errorMessage?: string
  handleTermsAccepted: React.ChangeEventHandler<HTMLInputElement>
  isTermsAccepted: boolean
}
