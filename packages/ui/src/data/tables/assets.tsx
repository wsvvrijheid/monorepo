import { Asset } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const useAssetsColumns = (): WTableProps<Asset>['columns'] => {
  return {
    images: { type: 'image' },
    name: { sortable: true },
    sku: {},
    value: {},
    location: {},
    rules: {},
    notes: {},
    peopleInCharge: {},
    invoice: {},
    createdAt: {
      type: 'date',
      sortable: true,
    },
  }
}
