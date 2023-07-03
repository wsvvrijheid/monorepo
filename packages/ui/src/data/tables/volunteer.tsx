import { Volunteer } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const volunteerColumns: WTableProps<Volunteer>['columns'] = {
  name: {},
  availableHours: {},
  phone: {},
  country: {},
  comment: {},
  occupation: {},
  createdAt: {
    type: 'date',
    componentProps: { format: 'dd MMMM' },
    sortable: true,
  },
}
