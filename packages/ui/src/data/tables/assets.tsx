import { Asset } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const useAssetsColumns = (): WTableProps<Asset>['columns'] => {
  return {
    name: { sortable: true },
    sku: {},
    value: {},
    location: {},
    rules: {},
    notes: {},
    peopleInCharge: {},
    invoice: {},
    images: { type: 'image' },
    createdAt: {
      type: 'date',
      sortable: true,
    },
  }
}
