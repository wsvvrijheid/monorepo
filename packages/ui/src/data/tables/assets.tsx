import { Asset, Profile } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const useAssetsColumns = (): WTableProps<Asset>['columns'] => {
  return {
    name: { sortable: true },
    sku: {},
    value: {},
    location: {},
    peopleInCharge: {
      transform: value => (value as Profile)?.name,
    },
    images: { type: 'image' },
    createdAt: {
      type: 'date',
      sortable: true,
    },
  }
}
