import { Donation } from '@wsvvrijheid/types'

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
      return {
        variant: 'outline',
        colorScheme: (value as string) === 'paid' ? 'green' : 'yellow',
      }
    },
  },
}
