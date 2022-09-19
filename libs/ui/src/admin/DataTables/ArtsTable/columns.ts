import { ApprovalStatus, Art, User } from '@wsvvrijheid/types'

import { WTableProps } from '../../../components'

export const columns: WTableProps<Art>['columns'] = {
  images: {
    type: 'image',
  },
  title: {
    sortable: true,
  },
  description: {},
  artist: {
    transform: value => (value as User).username,
    sortKey: 'username',
    sortable: true,
  },
  approvalStatus: {
    type: 'badge',
    componentProps: value => {
      const colorScheme = {
        approved: 'green',
        pending: 'yellow',
        rejected: 'red',
      }
      return {
        variant: 'outline',
        colorScheme: colorScheme[value as ApprovalStatus],
      }
    },
  },
  publishedAt: {
    type: 'date',
    componentProps: {
      format: 'dd MMMM',
    },
    sortable: true,
  },
}
