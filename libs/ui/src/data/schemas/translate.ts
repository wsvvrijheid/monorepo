import { StrapiTranslatableModel } from '@wsvvrijheid/types'
import * as yup from 'yup'

import { FormFields } from '../../admin'

export const translateModelSchema = yup.object({
  title: yup.string(),
  description: yup.string(),
  content: yup.string(),
})

export const translateModelFields: FormFields<StrapiTranslatableModel> = [
  { name: 'title', type: 'textarea' },
  { name: 'description', type: 'textarea' },
  { name: 'content', type: 'markdown' },
]
