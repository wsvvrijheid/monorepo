import { Donation } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const useDonationColumns = (): WTableProps<Donation>['columns'] => {
  return {
    email: { sortable: true },
    createdAt: {
      type: 'date',
      sortable: true,
    },
    amount: { sortable: true },
    status: {
      type: 'badge',
      componentProps: value => {
        return {
          variant: 'outline',
          colorScheme: (value as string) === 'paid' ? 'green' : 'yellow',
        }
      },
    },
  }
}
