export const adminRoleRoutes = [
  '/',
  '/accounts',
  '/activities',
  '/donations',
  '/arts',
  '/blogs',
  '/collections',
  '/competitions',
  '/courses',
  '/hashtags',
  '/news/recommended',
  '/posts',
  '/timelines/recommended',
  '/translates',
  '/profiles',
  '/user-feedbacks',
  '/volunteers',
  'all',
] as const

export const adminCommonRoutes = [
  '/donation',
  '/settings',
  '/news',
  '/news/bookmarks',
  '/timelines',
  '/timelines/bookmarks',
] as const

export type AdminRoleRoute = (typeof adminRoleRoutes)[number]
export type AdminCommonRoute = (typeof adminCommonRoutes)[number]
export type AdminRoute =
  | AdminRoleRoute
  | AdminCommonRoute
  | `${AdminCommonRoute}?${string}`
  | `${AdminRoleRoute}?${string}`
