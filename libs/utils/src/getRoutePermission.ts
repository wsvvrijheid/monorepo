import {
  AdminCommonRoutes,
  adminCommonRoutes,
  AdminRoutes,
} from '@wsvvrijheid/config'
import { Role } from '@wsvvrijheid/types'

export const getRoutePermission = (
  roles: Role['type'][],
  route: AdminRoutes,
) => {
  const roleRoutes: Record<Role['type'], AdminRoutes[]> = {
    admin: ['all'],
    editor: [
      '/accounts',
      '/activities',
      '/announcements',
      '/blogs',
      '/caps-maker',
      '/competitions',
      '/courses',
      '/hashtags',
      '/news/recommended',
    ],
    authenticated: [],
    author: [],
    jury: [],
    public: [],
    translator: [],
    arteditor: [
      '/arts',
      '/arts?status=approved',
      '/arts?status=rejected',
      '/collections',
    ],
    translatoreditor: [],
  }

  return roles.some(role => {
    const routes = roleRoutes[role]

    if (
      routes.includes('all') ||
      adminCommonRoutes.includes(route as AdminCommonRoutes)
    ) {
      return true
    } else {
      return routes.includes(route)
    }
  })
}
