import * as yup from 'yup'

import { User } from '@wsvvrijheid/types'

import { yupSelect } from './common'
import { FormFields } from '../../admin'

export const userSchema = yup.object({
  avatar: yup.string(),
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  role: yupSelect,
  email: yup.string().email('Not a valid email').required('Email is required'),
})
export const userFields: FormFields<User> = [
  { name: 'name', label: 'Name', isRequired: true },
  { name: 'avatar', isRequired: true, type: 'file' },
  { name: 'username', label: 'Username', isRequired: true },
  { name: 'email', label: 'Email', isRequired: true },
  {
    name: 'volunteer',
    label: 'Volunteer',
  },
  {
    name: 'createdAt',
    type: 'date',
    label: 'Created Date',
  },
  {
    name: 'updatedAt',
    type: 'date',
    label: 'Updated Date',
  },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    url: 'api/roles',
  },
]
