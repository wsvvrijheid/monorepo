import * as yup from 'yup'

import { Activity } from '@wsvvrijheid/types'

import { yupMultiSelect } from './common'
import { FormFields } from '../../admin'

export const useActivitySchema = () => {
  return yup.object({
    title: yup.string().required(),
    date: yup.date().required(),
    categories: yupMultiSelect,
    tags: yupMultiSelect,
    description: yup.string().required(),
    content: yup.string().required(),
    image: yup.mixed().required(),
    platforms: yupMultiSelect,
  })
}

export const activityFields: FormFields<Activity> = [
  { name: 'title', isRequired: true },
  { name: 'description', isRequired: true, type: 'textarea' },
  { name: 'date', isRequired: true, type: 'datetime-local' },

  { name: 'content', isRequired: true, type: 'markdown' },
  { name: 'image', type: 'file', isRequired: true },
  {
    name: 'platforms',
    type: 'select',
    isMulti: true,
    url: 'api/platforms',
  },
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
