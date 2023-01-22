import {
  Hashtag,
  Post,
  StrapiLocale,
  ApprovalStatus,
  User,
} from '@wsvvrijheid/types'

import { LocaleBadges, PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const postColumns: WTableProps<Post>['columns'] = {
  image: { type: 'image' },
  createdBy: {
    transform: value => (value as User)?.username,
    sortKey: 'username',
    sortable: true,
  },
  title: { sortable: true },
  content: {},
  hashtag: {
    sortable: true,
    label: 'Hashtag',
    transform: value => (value as Hashtag)?.title,
  },
  createdAt: {
    type: 'date',
    componentProps: { format: 'dd MMMM' },
    sortable: true,
  },
  capsStatus: {
    type: 'badge',
    componentProps: value => {
      const colorScheme = {
        approved: 'green',
        pending: 'yellow',
        rejected: 'red',
        original: 'blue',
      }
      return {
        variant: 'outline',
        colorScheme: colorScheme[value as ApprovalStatus],
      }
    },
  },
  translates: {
    label: 'Locales',
    transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
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
    label: 'Published',
    transform: value => (
      <PublicationBadges publishedAt={value as string | null} />
    ),
  },
}
