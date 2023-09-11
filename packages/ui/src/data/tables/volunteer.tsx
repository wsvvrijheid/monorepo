import { User, Volunteer } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const useVolunteerColumns = (): WTableProps<Volunteer>['columns'] => {
  return {
    user: {
      transform: value => (value as User)?.username,
    },
    name: {},
    availableHours: {},
    phone: {},
    country: {},
    occupation: {},
    createdAt: {
      type: 'date',
      sortable: true,
    },
  }
}
