import {
  Activity,
  ApprovalStatus,
  Profile,
  StrapiLocale,
} from '@wsvvrijheid/types'

import { LocaleBadges, PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const useActivityColumns = (): WTableProps<Activity>['columns'] => {
  return {
    image: { type: 'image' },
    creator: {
      transform: value => (value as Profile)?.username,
      sortKey: 'username',
      sortable: true,
    },
    title: { sortable: true },
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
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
    },
    createdAt: {
      type: 'date',
      sortable: true,
    },
    date: {
      type: 'date',
      sortable: true,
    },
  }
}
