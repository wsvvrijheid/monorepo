import {
  AdminCommonRoutes,
  adminCommonRoutes,
  AdminRoutes,
} from '@wsvvrijheid/config/adminRoutes'
import { Role } from '@wsvvrijheid/types'

export const getRoutePermission = (
  roles: Role['type'][],
  route: AdminRoutes,
) => {
  const roleRoutes: Record<Role['type'], AdminRoutes[]> = {
    academyeditor: ['/courses'],
    accountmanager: ['/news/recommended', '/timelines/recommended'],
    admin: ['all'],
    arteditor: [
      '/arts',
      '/arts?status=approved',
      '/arts?status=rejected',
      '/collections',
      '/translates/arts',
    ],
    authenticated: [],
    author: ['/blogs'],
    contentmanager: [
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
    jury: ['/competitions'],
    public: [],
    translator: [
      '/translates',
      '/translates/activities',
      '/translates/announcements',
      '/translates/blogs',
      '/translates/collections',
      '/translates/hashtags',
      '/translates/posts',
    ],
  }

  return roles?.some(role => {
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
