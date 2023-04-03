import * as yup from 'yup'

import { Art } from '@wsvvrijheid/types'

import { yupMultiSelect } from './common'
import { FormFields } from '../../admin'

export const artSchema = yup.object({
  title_en: yup.string().required('Title is required'),
  title_nl: yup.string().required('Title is required'),
  title_tr: yup.string().required('Title is required'),
  description_en: yup.string().required('Description is required'),
  description_nl: yup.string().required('Description is required'),
  description_tr: yup.string().required('Description is required'),
  categories: yupMultiSelect,
})

export const artFields: FormFields<Art> = [
  { name: 'title_en', label: 'Title English', isRequired: true },
  { name: 'title_nl', label: 'Title Dutch', isRequired: true },
  { name: 'title_tr', label: 'Title Turkish', isRequired: true },
  {
    name: 'description_en',
    label: 'Description English',
    isRequired: true,
    type: 'textarea',
  },
  {
    name: 'description_nl',
    label: 'Description Dutch',
    isRequired: true,
    type: 'textarea',
  },
  {
    name: 'description_tr',
    label: 'Description Turkish',
    isRequired: true,
    type: 'textarea',
  },
  {
    name: 'categories',
    type: 'select',
    isMulti: true,
    url: 'api/categories',
  },
]
