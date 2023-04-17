import { Course, CourseApplication } from '@wsvvrijheid/types'

import { PaidBadges } from '../../admin'
import { WTableProps } from '../../components'

export const applicationColumns: WTableProps<CourseApplication>['columns'] = {
  name: { label: 'Name', sortable: true },
  city: { label: 'City', sortable: true },
  email: { label: 'Email' },
  phone: { label: 'Phone' },
  country: { label: 'Country', sortable: true },
  hasPaid: {
    label: 'Paid ',
    transform: value => <PaidBadges hasPaid={value as boolean | null} />,
  },
  course: {
    label: 'Course',
    transform: value => (value as Course).title_nl,
  },
}
