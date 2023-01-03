import { Collection, StrapiLocale, Art } from '@wsvvrijheid/types'

import { LocaleBadges, PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const collectionColumns: WTableProps<Collection>['columns'] = {
  image: { type: 'image' },
  title: { sortable: true },
  slug: { label: 'Slug' },
  description: {},
  arts: { label: 'Arts', transform: value => (value as Art[])?.length },
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
    componentProps: { format: 'dd MMMM' },
    sortable: true,
  },
}
