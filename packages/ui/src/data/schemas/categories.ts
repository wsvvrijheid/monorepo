import * as yup from 'yup'

import { Category } from '@wsvvrijheid/types'

import { yupMultiSelect } from './common'
import { FormFields } from '../../admin'

export const useCategoriesSchema = () => {
  return yup.object({
    slug: yup.string().required(),
    arts: yupMultiSelect,
  })
}

export const categoryFields: FormFields<Category> = [
  { name: 'slug', isRequired: true },
  {
    name: 'arts',
    type: 'select',
    isMulti: true,
    endpoint: 'arts',
    isRequired: true,
  },
]
