import { Hashtag, Mention, Post, StrapiLocale } from '@wsvvrijheid/types'

import { WTableProps } from '../../../components'
import { LocaleBadges } from '../../LocaleBadges'
import { PublicationBadges } from '../../PublicationBadges'

export const columns: WTableProps<Hashtag>['columns'] = {
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
  posts: {
    label: 'Posts',
    transform: value => (value as Post[])?.length,
  },
  mentions: {
    label: 'Mentions',
    transform: value => (value as Mention[])?.length,
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
