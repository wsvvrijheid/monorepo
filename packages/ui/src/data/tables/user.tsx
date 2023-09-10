import { Role, User } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const useUserColumns = (): WTableProps<User>['columns'] => {
  return {
    avatar: { type: 'image' },
    name: {},
    username: {},
    role: { transform: value => (value as Role)?.name },
    createdAt: {
      type: 'date',
      componentProps: { format: 'dd MMMM' },
      sortable: true,
    },
  }
}
