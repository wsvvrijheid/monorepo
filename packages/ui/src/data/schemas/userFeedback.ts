import * as yup from 'yup'

import { UserFeedback } from '@wsvvrijheid/types'

import { FormFields } from '../../admin'

export const useUserFeedbackSchema = () => {
  return yup.object({
    comment: yup.string(),
    point: yup.string(),
    site: yup.string(),
    image: yup.mixed(),
  })
}

export const userFeedbackFields: FormFields<UserFeedback> = [
  { name: 'comment' },
  { name: 'point' },
  { name: 'site' },
  {
    name: 'image',
    type: 'file',
    group: { value: 'image', name: 'media' },
  },
]
