import { Role, User } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const usersColumns: WTableProps<User>['columns'] = {
  avatar: { type: 'image' },
  name: {},
  username: {},
  role: { label: 'Role', transform: value => (value as Role)?.name },
  createdAt: {
    type: 'date',
    componentProps: { format: 'dd MMMM' },
    sortable: true,
  },
}
