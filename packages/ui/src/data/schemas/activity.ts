import * as yup from 'yup'

import { Activity } from '@wsvvrijheid/types'

import { yupMultiSelect } from './common'
import { FormFields } from '../../admin'

export const activitySchema = yup.object({
  title: yup.string().required('Title is required'),
  date: yup.date().required('Date is required'),
  categories: yupMultiSelect,
  tags: yupMultiSelect,
  description: yup.string().required('Description is required'),
  content: yup.string().required('Content is required'),
  image: yup.mixed().required('Image is required'),
})

export const activityFields: FormFields<Activity> = [
  { name: 'title', isRequired: true },
  { name: 'description', isRequired: true, type: 'textarea' },
  { name: 'date', isRequired: true, type: 'datetime-local' },

  { name: 'content', isRequired: true, type: 'markdown' },
  { name: 'image', type: 'file', isRequired: true },
  {
    name: 'categories',
    type: 'select',
    isMulti: true,
    url: 'api/categories',
  },
  {
    name: 'tags',
    type: 'select',
    isMulti: true,
    url: 'api/tags',
  },
]
