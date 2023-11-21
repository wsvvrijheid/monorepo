import * as yup from 'yup'

import { Asset } from '@wsvvrijheid/types'

import { yupSelect } from './common'
import { FormFields } from '../../admin'

export const useAssetsSchema = () => {
  return yup.object({
    name: yup.string().required(),
    price: yup.number(),
    location: yup.string().required(),
    rules: yup.string(),
    notes: yup.string(),
    peopleInCharge: yupSelect.required(),
    invoice: yup.mixed(),
    images: yup.mixed().required(),
  })
}

export const assetFields: FormFields<Asset> = [
  { name: 'name', isRequired: true },
  { name: 'price', isRequired: true, type: 'number-input' },
  { name: 'location', isRequired: true },
  { name: 'rules', type: 'markdown' },
  { name: 'notes', type: 'markdown' },
  {
    name: 'peopleInCharge',
    isRequired: true,
    type: 'select',
    endpoint: 'profiles',
  },
  { name: 'invoice', type: 'file' },
  { name: 'images', type: 'file', group: { value: 'image', name: 'media' } },
]
