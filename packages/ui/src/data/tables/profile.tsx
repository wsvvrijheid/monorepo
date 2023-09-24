import { User, Profile, Role } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const useProfileColumns = (): WTableProps<
  Profile & { role: Role }
>['columns'] => {
  return {
    avatar: {
      type: 'image',
    },
    user: {
      label: 'user',
      transform: value => (value as User)?.email,
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
