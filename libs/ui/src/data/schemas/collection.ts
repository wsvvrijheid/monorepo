import { Collection } from '@wsvvrijheid/types'
import * as yup from 'yup'

import { FormFields } from '../../admin'

export const collectionSchema = yup.object({
  title: yup.string().required('Title is required'),
  date: yup.date().required('Date is required'),
  description: yup.string().required('Description is required'),
  content: yup.string().required('Content is required'),
  image: yup.mixed().required('Image is required'),
})

export const collectionFields: FormFields<Collection> = [
  { name: 'title', isRequired: true },
  { name: 'date', isRequired: true, type: 'datetime-local' },
  { name: 'description', isRequired: true, type: 'textarea' },
  { name: 'content', isRequired: true, type: 'textarea' },
  { name: 'image', isRequired: true, type: 'file' },
]