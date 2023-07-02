import { RoleType } from '@wsvvrijheid/types'

const adminRoleRoutes = [
  '/',
  '/accounts',
  '/activities',
  '/announcements',
  '/arts',
  '/arts?status=pending',
  '/arts?status=approved',
  '/arts?status=rejected',
  '/blogs',
  '/caps-maker',
  '/collections',
  '/competitions',
  '/courses',
  '/hashtags',
  '/news/recommended',
  '/posts',
  '/timelines/recommended',
  '/translates',
  '/users',
  'all',
] as const

const adminCommonRoutes = [
  '/',
  '/donation',
  '/settings',
  '/news',
  '/news/bookmarks',
  '/timelines',
  '/timelines/bookmarks',
] as const

type AdminRoleRoutes = (typeof adminRoleRoutes)[number]
type AdminCommonRoutes = (typeof adminCommonRoutes)[number]
type AdminRoutes = AdminRoleRoutes | AdminCommonRoutes

export const getRoutePermission = (roles: RoleType[], route: AdminRoutes) => {
  const roleRoutes: Record<RoleType, AdminRoutes[]> = {
    academyeditor: ['/courses'],
    accountmanager: ['/news/recommended', '/timelines/recommended'],
    admin: ['all'],
    arteditor: [
      '/arts',
      '/arts?status=approved',
      '/arts?status=rejected',
      '/collections',
      '/translates',
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
    translator: ['/translates'],
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
