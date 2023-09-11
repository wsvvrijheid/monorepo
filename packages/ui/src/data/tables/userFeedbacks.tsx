import { UserFeedback } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const useUserFeedbacksColumns =
  (): WTableProps<UserFeedback>['columns'] => {
    return {
      comment: {},
      point: {},
      createdAt: {
        type: 'date',
        sortable: true,
      },
      site: {},
    }
  }
