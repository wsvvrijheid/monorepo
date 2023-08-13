import { Donation, ApprovalStatus } from '@wsvvrijheid/types'

// import { LocaleBadges} from '../../admin'
import { WTableProps } from '../../components'

export const donationColumns: WTableProps<Donation>['columns'] = {
  amount: { sortable: true },
  email: {},
  // translates: {
  //   transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
  // },
  createdAt: {
    type: 'date',
    componentProps: { format: 'dd MMMM' },
    sortable: true,
  },
  status: {
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
}
