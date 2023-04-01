import * as yup from 'yup'

import { Blog } from '@wsvvrijheid/types'

import { yupMultiSelect } from './common'
import { FormFields } from '../../admin'

export const blogSchema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  categories: yupMultiSelect,
  tags: yupMultiSelect,
  image: yup.mixed().required('Image is required'),
})

export const blogFields: FormFields<Blog> = [
  { name: 'title', isRequired: true },
  { name: 'image', type: 'file', isRequired: true },
  { name: 'content', isRequired: true, type: 'markdown' },
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
