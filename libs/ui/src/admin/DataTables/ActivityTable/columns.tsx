import { Activity, ApprovalStatus, StrapiLocale } from '@wsvvrijheid/types'

import { WTableProps } from '../../../components'
import { LocaleBadges } from '../../LocaleBadges'
import { PublicationBadges } from '../../PublicationBadges'

export const columns: WTableProps<Activity>['columns'] = {
  image: {
    type: 'image',
  },
  title: {
    sortable: true,
  },
  description: {},

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
  translates: {
    transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
  },
  publishedAt: {
    label: 'Published',
    transform: value => (
      <PublicationBadges publishedAt={value as string | null} />
    ),
  },
  createdAt: {
    type: 'date',
    componentProps: {
      format: 'dd MMMM',
    },
    sortable: true,
  },
  date: {
    type: 'date',
    componentProps: {
      format: 'dd MMMM yyyy',
    },
    sortable: true,
  },
}
