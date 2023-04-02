import * as yup from 'yup'

import { RecommendedTopic } from '@wsvvrijheid/types'

import { FormFields } from '../../admin'

export const topicSchema = yup.object({
  title: yup.string().required('Title is required'),
  url: yup.string(),
  description: yup.string().required('Description is required'),
  publisher: yup.string().required('Publisher is required'),
  category: yup.string(),
  time: yup.date(),
  image: yup.mixed(),
})

export const topicFields: FormFields<RecommendedTopic> = [
  { name: 'title', isRequired: true },
  { name: 'url', isRequired: true },
  { name: 'description', isRequired: true, type: 'textarea' },
  { name: 'publisher', isRequired: true },
  { name: 'time', type: 'datetime-local' },
  { name: 'category' },
  { name: 'image' },
]
