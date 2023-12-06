import * as yup from 'yup'

import { AssetsTracking } from '@wsvvrijheid/types/src/assets-tracking'

import { yupSelect } from './common'
import { FormFields } from '../../admin'

export const useAssetsTrackingSchema = () => {
  return yup.object({
    fromLocation: yup.string().required(),
    toLocation: yup.string().required(),
    date: yup.date().required(),
    notes: yup.string(),
    asset: yupSelect.required(),
    assignedTo: yupSelect.required(),
    previousTracking: yupSelect,
  })
}

export const assetsTrackingFields: FormFields<AssetsTracking> = [
  { name: 'fromLocation', isRequired: true },
  { name: 'toLocation', isRequired: true },
  {
    name: 'date',
    isRequired: true,
    type: 'date',
  },
  {
    name: 'asset',
    isRequired: true,
    type: 'select',
    endpoint: 'assets',
  },
  {
    name: 'previousTracking',
    type: 'select',
    endpoint: 'assets-trackings',
  },
  {
    name: 'assignedTo',
    isRequired: true,
    type: 'select',
    endpoint: 'profiles',
  },
  { name: 'notes', type: 'markdown' },
]
