import { ThemeTypings } from '@chakra-ui/react'

import { Profile, Role, RoleName, User } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const useProfileColumns = (): WTableProps<
  Profile & { role: Role }
>['columns'] => {
  return {
    avatar: {
      type: 'image',
    },
    user: {
      label: 'role',
      transform: value => (value as User)?.role?.name,
      sortable: true,
      sortKey: 'role.name',
      type: 'badge',
      componentProps: value => {
        const rolesColorMap: Record<RoleName, ThemeTypings['colorSchemes']> = {
          'ArtEditor Translator': 'pink',
          'Author Translator': 'facebook',
          'ContentManager Translator': 'orange',
          AcademyEditor: 'blue',
          AccountManager: 'cyan',
          Admin: 'primary',
          All: 'gray',
          ArtEditor: 'purple',
          Authenticated: 'gray',
          Author: 'facebook',
          ContentManager: 'orange',
          Jury: 'yellow',
          Public: 'gray',
          Translator: 'whatsapp',
        }

        return {
          colorScheme: rolesColorMap[value as keyof typeof rolesColorMap],
          variant: 'outline',
        }
      },
    },
    name: {},
    email: {},
    availableHours: { sortable: true },
    phone: {},
    country: { sortable: true },
    occupation: {},
    createdAt: { type: 'date', sortable: true },
  }
}
