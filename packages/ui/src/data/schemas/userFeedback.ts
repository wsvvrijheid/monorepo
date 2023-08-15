import * as yup from 'yup'

import { UserFeedback } from '@wsvvrijheid/types'

import { FormFields } from '../../admin'

export const userFeedbackSchema = yup.object({
  comment: yup.string(),
  point: yup.string(),
  site: yup.string(),
})

export const userFeedbackFields: FormFields<UserFeedback> = [
  { name: 'comment' },
  { name: 'point' },
  { name: 'site' },
]
