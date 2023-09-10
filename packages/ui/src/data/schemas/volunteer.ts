import * as yup from 'yup'

import { Volunteer } from '@wsvvrijheid/types'

import { yupMultiSelect, yupSelect } from './common'
import { FormFields } from '../../admin'

export const useVolunteerSchema = () => {
  return yup.object({
    name: yup.string().required(),
    username: yup.string().required(),
    jobs: yupMultiSelect,
    user: yupSelect,
    email: yup.string().email().required(),
    phone: yup.string(),
    city: yup.string(),
    country: yup.string(),
    platforms: yupMultiSelect,
  })
}

export const volunteerFields: FormFields<Volunteer> = [
  { name: 'name', isRequired: true },
  { name: 'availableHours' },
  { name: 'username', isRequired: true },
  { name: 'email', isRequired: true },
  {
    name: 'city',
  },
  {
    name: 'country',
  },
  {
    name: 'phone',
  },
  {
    name: 'createdAt',
    type: 'date',
  },
  {
    name: 'updatedAt',
    type: 'date',
  },
  { name: 'age' },
  {
    name: 'jobs',
    type: 'select',
    isMulti: true,
    endpoint: 'jobs',
  },
  {
    name: 'user',
    type: 'select',
    endpoint: 'users',
  },
  { name: 'comment' },
  {
    name: 'platforms',
    type: 'select',
    isMulti: true,
    endpoint: 'platforms',
  },
]
