import {
  AdminCommonRoute,
  adminCommonRoutes,
  AdminRoute,
} from '@wsvvrijheid/config'
import { RoleType } from '@wsvvrijheid/types'

export const getRoutePermission = (roles: RoleType[], route: AdminRoute) => {
  const roleRoutes: Record<
    RoleType,
    (AdminRoute | `${AdminRoute}?${string}`)[]
  > = {
    academyeditor: ['/courses'],
    accountmanager: ['/news/recommended', '/timelines/recommended'],
    admin: ['all'],
    arteditor: ['/arts', '/collections', '/translates'],
    authenticated: [],
    author: ['/blogs'],
    contentmanager: [
      '/accounts',
      '/activities',
      '/announcements',
      '/blogs',
      '/competitions',
      '/hashtags',
      '/news/recommended',
    ],
    jury: ['/competitions'],
    public: ['/timelines', '/news'],
    translator: ['/translates'],
    all: [],
  }

  return roles?.some(role => {
    const routes = roleRoutes[role]

    if (roles?.includes('public') && route === '/') {
      return false
    }

    if (
      routes.includes('all') ||
      adminCommonRoutes.includes(route as AdminCommonRoute)
    ) {
      return true
    } else {
      return routes.includes(route)
    }
  })
}
