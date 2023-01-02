import { ApprovalStatus, Art, StrapiLocale, User } from '@wsvvrijheid/types'
import { LocaleBadges, PublicationBadges, WTableProps } from '@wsvvrijheid/ui'

export const artCOlumns: WTableProps<Art>['columns'] = {
  image: {
    type: 'image',
  },
  title: {
    sortable: true,
  },
  description: {},
  artist: {
    transform: value => (value as User)?.username,
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
}
