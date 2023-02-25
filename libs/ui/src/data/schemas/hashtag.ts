import { Hashtag } from '@wsvvrijheid/types'
import * as yup from 'yup'

import { yupMultiSelect } from './common'
import { FormFields } from '../../admin'

export const mainHashtagSchema = yup.object({
  title: yup.string().required('Title is required'),
  date: yup.date().required('Date is required'),
  description: yup.string().required('Description is required'),
  content: yup.string(),
  hashtagDefault: yup.string().required('Hashtag is required'),
  hashtagExtra: yup.string(),
  categories: yupMultiSelect,
  mentions: yupMultiSelect,
  image: yup.mixed().required('Image is required'),
})

export const mainHashtagFields: FormFields<Hashtag> = [
  { name: 'title', isRequired: true },
  { name: 'date', type: 'datetime-local', isRequired: true },
  { name: 'description', isRequired: true, type: 'textarea' },
  { name: 'image', type: 'file', isRequired: true },
  { name: 'content', type: 'markdown' },
  {
    name: 'hashtagDefault',
    label: 'Default Hashtag',
    isRequired: true,
  },
  { name: 'hashtagExtra', label: 'Extra Hashtag' },
  {
    name: 'mentions',
    type: 'select',
    url: 'api/mentions',
    isMulti: true,
  },
  {
    name: 'categories',
    type: 'select',
    url: 'api/categories',
    isMulti: true,
  },
]
