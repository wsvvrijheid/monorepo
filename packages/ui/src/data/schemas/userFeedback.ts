import * as yup from 'yup'

import { UserFeedback } from '@wsvvrijheid/types'

import { FormFields } from '../../admin'

export const userFeedbackSchema = yup.object({
  comment: yup.string(),
  point: yup.string(),
  site: yup.string(),
  image: yup.mixed(),
})

export const userFeedbackFields: FormFields<UserFeedback> = [
  { name: 'comment' },
  { name: 'point' },
  { name: 'site' },
  {
    name: 'image',
    type: 'file',
    group: { label: 'Image', value: 'image', name: 'media' },
  },
]
