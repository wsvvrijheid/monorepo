export const adminRoleRoutes = [
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

export const adminCommonRoutes = [
  '/',
  '/donation',
  '/settings',
  '/news',
  '/news/bookmarks',
  '/timelines',
  '/timelines/bookmarks',
] as const

export type AdminRoleRoutes = (typeof adminRoleRoutes)[number]
export type AdminCommonRoutes = (typeof adminCommonRoutes)[number]
export type AdminRoutes = AdminRoleRoutes | AdminCommonRoutes
