import { AssetsTracking } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const useAssetsTrackingsColumns =
  (): WTableProps<AssetsTracking>['columns'] => {
    return {
      fromLocation: {},
      toLocation: {},
      date: {
        type: 'date',
        sortable: true,
      },
      asset: {},
      assignedTo: {},
      createdAt: {
        type: 'date',
        sortable: true,
      },
    }
  }
