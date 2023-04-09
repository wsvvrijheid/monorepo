import { CourseApplication } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const applicatonsColumns: WTableProps<CourseApplication>['columns'] = {
  name: { label: 'Name' },
  city: { label: 'City' },
  email: { label: 'Email' },
  phone: { label: 'Phone' },
  country: { label: 'Country' },
  course: { label: 'Course' },
}
