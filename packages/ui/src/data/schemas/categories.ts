import * as yup from 'yup'

import { Category } from '@wsvvrijheid/types'

import { FormFields } from '../../admin'

export const useCategoriesSchema = () => {
  return yup.object({
    slug: yup.string().required(),
    name_en: yup.date().required(),
    name_nl: yup.date().required(),
    name_tr: yup.date().required(),
  })
}

export const categoryFields: FormFields<Category> = [
  { name: 'slug', isRequired: true },
  { name: 'name_en', isRequired: true },
  { name: 'name_nl', isRequired: true },
  { name: 'name_tr', isRequired: true },
]
