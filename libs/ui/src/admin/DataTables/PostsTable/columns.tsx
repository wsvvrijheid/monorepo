import {
  ApprovalStatus,
  Hashtag,
  Post,
  StrapiLocale,
  TranslationStatus,
} from '@wsvvrijheid/types'

import { WTableProps } from '../../../components'
import { LocaleBadges } from '../../LocaleBadges'
import { PublicationBadges } from '../../PublicationBadges'

export const columns: WTableProps<Post>['columns'] = {
  image: {
    type: 'image',
  },
  creator: {},
  title: {
    sortable: true,
  },
  content: {},
  hashtag: {
    sortable: true,
    label: 'Hashtag',
    transform: value => (value as Hashtag)?.title,
  },
  createdAt: {
    type: 'date',
    componentProps: {
      format: 'dd MMMM',
    },
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
        colorScheme: colorScheme[value as TranslationStatus],
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
