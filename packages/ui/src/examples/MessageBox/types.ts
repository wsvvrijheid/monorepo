/* eslint-disable no-unused-vars */
export type MessageBoxFieldValues = {
  message: string
}

export type MessageBoxProps = {
  onSubmitHandler: (data: MessageBoxFieldValues) => void
  errorMessage?: string
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}
