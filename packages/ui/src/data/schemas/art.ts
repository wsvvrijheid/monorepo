import * as yup from 'yup'

import { Art } from '@wsvvrijheid/types'

import { yupMultiSelect } from './common'
import { FormFields } from '../../admin'

export const useArtSchema = () => {
  return yup.object({
    title_en: yup.string().required(),
    title_nl: yup.string().required(),
    title_tr: yup.string().required(),
    description_en: yup.string().required(),
    description_nl: yup.string().required(),
    description_tr: yup.string().required(),
    categories: yupMultiSelect,
  })
}

export const artFields: FormFields<Art> = [
  { name: 'title_en', isRequired: true },
  { name: 'title_nl', isRequired: true },
  { name: 'title_tr', isRequired: true },
  {
    name: 'description_en',
    isRequired: true,
    type: 'textarea',
  },
  {
    name: 'description_nl',
    isRequired: true,
    type: 'textarea',
  },
  {
    name: 'description_tr',
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
