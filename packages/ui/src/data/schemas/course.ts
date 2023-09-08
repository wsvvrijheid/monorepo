import * as yup from 'yup'

import { Course } from '@wsvvrijheid/types'

import { yupSelect } from './common'
import { FormFields } from '../../admin'

export const useCourseSchema = () => {
  return yup.object({
    title_tr: yup.string().required(),
    title_en: yup.string().required(),
    title_nl: yup.string().required(),
    description_tr: yup.string().required(),
    description_nl: yup.string().required(),
    description_en: yup.string().required(),
    content_tr: yup.string().required(),
    content_nl: yup.string().required(),
    content_en: yup.string().required(),
    location: yup.string().required(),
    instructor: yup.string().required(),
    quota: yup.number(),
    price: yup.number(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    isOnline: yup.bool(),
    image: yup.mixed().required(),
    platform: yupSelect,
    language: yup.mixed().oneOf(['tr', 'nl', 'en']),
  })
}

export const courseFields: FormFields<Course> = [
  { name: 'title_tr', label: 'Title Turkish', isRequired: true },
  { name: 'title_nl', label: 'Title Dutch', isRequired: true },
  { name: 'title_en', label: 'Title English', isRequired: true },
  {
    name: 'description_tr',
    label: 'Description Turkish',
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
    name: 'description_en',
    label: 'Description English',
    isRequired: true,
    type: 'textarea',
  },
  {
    name: 'content_nl',
    label: 'Content Dutch',
    isRequired: true,
    type: 'markdown',
  },
  {
    name: 'content_tr',
    label: 'Content Turkish',
    isRequired: true,
    type: 'markdown',
  },
  {
    name: 'content_en',
    label: 'Content English',
    isRequired: true,
    type: 'markdown',
  },
  { name: 'image', isRequired: true, type: 'file' },
  { name: 'isOnline', type: 'boolean', label: 'Is Online' },
  { name: 'language', isRequired: true },
  {
    name: 'startDate',
    isRequired: true,
    type: 'date',
    label: 'Start Date',
  },
  { name: 'location', isRequired: true },
  {
    name: 'endDate',
    isRequired: true,
    type: 'date',
    label: 'End Date',
  },
  { name: 'instructor', isRequired: true },
  { name: 'quota', isRequired: true, type: 'number-input' },
  { name: 'price', isRequired: true, type: 'number-input' },
  {
    name: 'tags',
    type: 'select',
    isMulti: true,
    url: 'api/tags',
  },
  {
    name: 'platform',
    type: 'select',
    url: 'api/platforms',
  },
]
