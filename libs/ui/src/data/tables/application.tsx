import { Course, CourseApplication } from '@wsvvrijheid/types'

import { PaidBadges } from '../../admin'
import { WTableProps } from '../../components'

export const applicationColumns: WTableProps<CourseApplication>['columns'] = {
  name: { label: 'Name' },
  city: { label: 'City' },
  email: { label: 'Email' },
  phone: { label: 'Phone' },
  country: { label: 'Country' },
  hasPaid: {
    label: 'Paid ',
    transform: value => <PaidBadges hasPaid={value as boolean | null} />,
  },
  course: {
    label: 'Course',
    transform: value => (value as Course).title_nl,
  },
}
