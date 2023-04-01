import { Tweet } from '@wsvvrijheid/types'
import * as yup from 'yup'

import { schema } from './schema'

export type CreateTweetFormFieldValues = yup.InferType<typeof schema>

export type CreateTweetFormProps = {
  onSubmit?: (data: CreateTweetFormFieldValues) => void
  onClose: () => void
  isOpen: boolean
  originalTweet: Partial<Tweet>
  isNews: boolean
}
