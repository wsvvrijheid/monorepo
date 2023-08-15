import { Donation } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const donationColumns: WTableProps<Donation>['columns'] = {
  amount: { sortable: true },
  email: { sortable: true },
  createdAt: {
    type: 'date',
    componentProps: { format: 'dd MMMM' },
    sortable: true,
  },
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