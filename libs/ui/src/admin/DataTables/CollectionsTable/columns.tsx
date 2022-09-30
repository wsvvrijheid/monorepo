import { Collection, StrapiLocale, Art } from '@wsvvrijheid/types'

import { WTableProps } from '../../../components'
import { LocaleBadges } from '../../LocaleBadges'
import { PublicationBadges } from '../../PublicationBadges'

export const columns: WTableProps<Collection>['columns'] = {
  image: {
    type: 'image',
  },
  title: {
    sortable: true,
  },
  slug: {
    label: 'Slug',
  },
  description: {},
  arts: {
    label: 'Arts',
    transform: (value: Art[]) => value?.length,
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
