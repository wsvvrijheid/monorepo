import * as yup from 'yup'

import { createFeedbackSchema } from './schema'

export type CreateFeedbackFormFieldValues = yup.InferType<
  typeof createFeedbackSchema
>

export type CreateFeedbackFormProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: CreateFeedbackFormFieldValues) => void
}
