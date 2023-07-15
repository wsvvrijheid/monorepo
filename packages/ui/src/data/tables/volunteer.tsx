import { User, Volunteer } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const volunteerColumns: WTableProps<Volunteer>['columns'] = {
  user: {
    label: 'User',
    transform: value => (value as User)?.username,
  },
  name: {},
  availableHours: {
    label: 'Hours',
  },
  phone: {},
  country: {},
  occupation: {},
  createdAt: {
    type: 'date',
    componentProps: { format: 'dd MMMM' },
    sortable: true,
  },
}
