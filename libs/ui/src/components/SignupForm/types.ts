export type SignupFormFieldValues = {
  email: string
  password: string
  username: string
  name: string
}

export type SignupFormProps = {
  onSignup: (data: SignupFormFieldValues) => void
  errorMessage?: string
  onAcceptTerms: React.ChangeEventHandler<HTMLInputElement>
  isTermsAccepted: boolean
}
