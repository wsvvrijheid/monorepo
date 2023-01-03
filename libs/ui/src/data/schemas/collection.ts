import * as yup from 'yup'

import { FormFields } from '../../admin'

export const collectionSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  content: yup.string().required('Content is required'),
  date: yup.date().required('Date is required'),
  image: yup.mixed(),
})

export type CollectionSchemaKeys = keyof yup.InferType<typeof collectionSchema>

export const collectionFields: FormFields<CollectionSchemaKeys> = [
  { name: 'title', isRequired: true },
  { name: 'description', isRequired: true, type: 'textarea' },
  { name: 'date', isRequired: true, type: 'datetime-local' },
  { name: 'content', isRequired: true, type: 'textarea' },
  { name: 'image', isRequired: true, type: 'file' },
]
