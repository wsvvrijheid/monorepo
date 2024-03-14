import { Asset } from '@fc/types'

import { WTableProps } from '../../components'

export const useAssetsColumns = (): WTableProps<Asset>['columns'] => {
  return {
    name: { sortable: true },
    location: {},
    sku: {},
    images: { type: 'image' },
    price: {},
    createdAt: {
      type: 'date',
      sortable: true,
    },
  }
}
