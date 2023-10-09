import { ThemeTypings } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { Platform, Profile, Role, RoleName, User } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const useProfileColumns = (): WTableProps<
  Profile & { role: Role }
>['columns'] => {
  const { t } = useTranslation()

  return {
    avatar: {
      type: 'image',
    },
    isVolunteer: {
      label: 'volunteer',
      type: 'badge',
      transform: value => (value ? t('volunteer') : null),
      componentProps: {
        colorScheme: 'primary',
        variant: 'outline',
      },
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
    platforms: {
      transform: value => (value as Platform[])?.map(p => p.slug).join(', '),
      sortable: true,
      sortKey: `slug`,
    },
    name: { sortable: true },
    email: { sortable: true },
    availableHours: { sortable: true },
    phone: {},
    country: { sortable: true },
    occupation: {},
    createdAt: { type: 'date', sortable: true },
  }
}
