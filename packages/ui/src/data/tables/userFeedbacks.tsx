import { UserFeedback } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const userFeedbacksColumns: WTableProps<UserFeedback>['columns'] = {
  comment: {},
  point: {
    label: 'Point',
  },
  createdAt: {
    type: 'date',
    componentProps: { format: 'dd MMMM' },
    sortable: true,
  },
  site: {},
}
