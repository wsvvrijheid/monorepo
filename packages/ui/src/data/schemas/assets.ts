import * as yup from 'yup'

import { Asset } from '@wsvvrijheid/types'

import { FormFields } from '../../admin'

export const useAssetsSchema = () => {
  return yup.object({
    name: yup.string().required(),
    value: yup.string().required(),
    location: yup.string().required(),
    rules: yup.string().required(),
    notes: yup.string().required(),
    peopleInCharge: yup.string().required(),
    invoice: yup.mixed().required(),
    images: yup.mixed().required(),
  })
}

export const assetFields: FormFields<Asset> = [
  { name: 'name', isRequired: true },
  { name: 'value', isRequired: true },
  { name: 'location', isRequired: true },
  { name: 'rules', isRequired: true  },
  { name: 'notes', isRequired: true  },
  { name: 'peopleInCharge', isRequired: true, type: 'select', endpoint: 'users'  },
  { name: 'invoice', type: 'file', isRequired: true },
  { name: 'images', type: 'file', isRequired: true },
]
