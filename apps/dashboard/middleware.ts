import { getIronSession } from 'iron-session/edge'
import { NextRequest, NextResponse } from 'next/server'

import { adminCommonRoutes } from '@wsvvrijheid/config/src/adminRoutes'

import { getRoutePermission } from './getRoutePermission'

const PUBLIC_FILE = /\.(.*)$/
const PUBLIC_PAGES = ['/login', '/not-allowed', ...adminCommonRoutes]

export const middleware = async (req: NextRequest) => {
  const { nextUrl, url } = req
  const res = NextResponse.next()

  const notPage =
    nextUrl.pathname.startsWith('/_next') ||
    nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(nextUrl.pathname)

  const session = await getIronSession(req, res, {
    password:
      process.env['SECRET_COOKIE_PASSWORD'] ||
      '12345678901234567890123456789012',
    cookieName: 'iron-session',
    cookieOptions: {
      secure: process.env['NODE_ENV'] === 'production',
    },
  })

  if (notPage) return res

  if (!session.user && !PUBLIC_PAGES.includes(nextUrl.pathname)) {
    // unauthorized to see pages inside admin/
    return NextResponse.redirect(new URL(`/news`, url)) // redirect to /login page
  }

  if (session.user && nextUrl.pathname.includes('/login')) {
    return NextResponse.redirect(new URL(`/`, url)) // redirect to /login page
  }

  let route = nextUrl.pathname

  const breadcrumbs = route.split('/')
  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1]
  const hasId = !isNaN(Number(lastBreadcrumb))
  const paramId = hasId ? Number(lastBreadcrumb) : null

  if (paramId) {
    route = breadcrumbs.slice(0, breadcrumbs.length - 1).join('/')
  }

  const hasPermission =
    session.user?.roles && getRoutePermission(session.user?.roles, route as any)

  if (session.user && !hasPermission && nextUrl.pathname !== '/not-allowed') {
    return NextResponse.redirect(new URL('/not-allowed', url))
  }

  return res
}
