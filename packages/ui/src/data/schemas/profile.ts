import * as yup from 'yup'

import { Profile, Role } from '@wsvvrijheid/types'

import { yupMultiSelect, yupSelect } from './common'
import { FormFields } from '../../admin'

export const useProfileSchema = () => {
  return yup.object({
    name: yup.string().required(),
    username: yup.string().required(),
    jobs: yupMultiSelect,
    user: yupSelect.required(),
    email: yup.string().email().required(),
    phone: yup.string(),
    city: yup.string(),
    country: yup.string(),
    platforms: yupMultiSelect,
  })
}

export const profileFields: FormFields<Profile & { role: Role }> = [
  { name: 'name', isRequired: true },
  { name: 'availableHours' },
  { name: 'username', isRequired: true },
  { name: 'email', isRequired: true, blockEdit: true },
  { name: 'city' },
  { name: 'country' },
  { name: 'phone' },
  { name: 'createdAt', type: 'date' },
  { name: 'updatedAt', type: 'date' },
  { name: 'age' },
  { name: 'avatar', type: 'file' },
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
