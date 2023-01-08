import { Topic } from '@wsvvrijheid/types'
import * as yup from 'yup'

import { FormFields } from '../../admin'

export const topicSchema = yup.object({
  title: yup.string().required('Title is required'),
  url: yup.string(),
  description: yup.string().required('Description is required'),
  content: yup.string(),
  category: yup.string(),
  image: yup.mixed().required('Image is required'),
  publisher: yup.string(),
})

export const topicFields: FormFields<Topic> = [
  { name: 'title', isRequired: true },
  { name: 'url', isRequired: true },
  { name: 'description', isRequired: true, type: 'textarea' },
  { name: 'content', type: 'textarea', isRequired: true },
  { name: 'image', type: 'file', isRequired: true },
]
