import * as yup from 'yup'

import { FormFields } from '../../admin'

export const activitySchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  content: yup.string().required('Content is required'),
  date: yup.date().required('Date is required'),
  image: yup.mixed(),
})

export type ActivitySchemaKeys = keyof yup.InferType<typeof activitySchema>

export const activityFields: FormFields<ActivitySchemaKeys> = [
  { name: 'title', isRequired: true },
  { name: 'description', isRequired: true, type: 'textarea' },
  { name: 'content', isRequired: true, type: 'textarea' },
  { name: 'date', isRequired: true, type: 'datetime-local' },
  { name: 'image', type: 'file', isRequired: true },
]
