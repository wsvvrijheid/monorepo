import { User, Profile } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const useProfileColumns = (): WTableProps<Profile>['columns'] => {
  return {
    avatar: {
      type: 'image',
    },
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
