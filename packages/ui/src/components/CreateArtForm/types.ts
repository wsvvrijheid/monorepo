import { InferType } from 'yup'

import { createArtSchema } from './schema'

export type CreateArtFormFieldValues = InferType<
  ReturnType<typeof createArtSchema>
>

export type CreateArtSuccessAlertProps = {
  isOpen: boolean
  onClose: () => void
}
