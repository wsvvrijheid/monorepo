export type ContactFormFieldValues = {
  email: string
  fullname: string
  message: string
}
export type ContactFormProps = {
  onSubmitHandler: (data: ContactFormFieldValues) => void
  errorMessage?: string
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}
