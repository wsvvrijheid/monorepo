import { Post, StrapiLocale, TranslationStatus } from '@wsvvrijheid/types'

import { WTableProps } from '../../../components'
import { LocaleBadges } from '../../LocaleBadges'
import { PublicationBadges } from '../../PublicationBadges'

export const columns: WTableProps<Post>['columns'] = {
  image: {
    type: 'image',
  },
  title: {
    sortable: true,
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
  publishedAt: {
    label: 'Published',
    transform: value => (
      <PublicationBadges publishedAt={value as string | null} />
    ),
  },
}
