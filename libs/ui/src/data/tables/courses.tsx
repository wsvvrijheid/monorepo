import { StrapiLocale, Course } from '@wsvvrijheid/types'

import { LocaleBadges, PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const coursesColumns: WTableProps<Course>['columns'] = {
  image: { type: 'image' },
  title_nl: { label: 'Title' },
  description_nl: { label: 'Description' },
  translates: {
    transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
  },
  publishedAt: {
    label: 'Published',
    transform: value => (
      <PublicationBadges publishedAt={value as string | null} />
    ),
  },
  startDate: {
    type: 'date',
    componentProps: { format: 'dd MMMM' },
    sortable: true,
  },
  endDate: {
    type: 'date',
    componentProps: { format: 'dd MMMM' },
    sortable: true,
  },
}
