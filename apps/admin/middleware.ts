import { getIronSession } from 'iron-session/edge'
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getRoutePermission } from '@wsvvrijheid/utils/getRoutePermission'

const PUBLIC_FILE = /\.(.*)$/

export const middleware = async (req: NextRequest) => {
  const { nextUrl, url } = req
  const res = NextResponse.next()

  const notPage =
    nextUrl.pathname.startsWith('/_next') ||
    nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(nextUrl.pathname)

  const session = await getIronSession(req, res, {
    password:
      process.env['NX_SECRET_COOKIE_PASSWORD'] ||
      '12345678901234567890123456789012',
    cookieName: 'iron-session',
    cookieOptions: {
      secure: process.env['NODE_ENV'] === 'production',
    },
  })

  if (notPage) return res

  if (!session.user && !nextUrl.pathname.includes('/login')) {
    // unauthorized to see pages inside admin/
    return NextResponse.redirect(new URL(`/login`, url)) // redirect to /login page
  }

  if (session.user && nextUrl.pathname.includes('/login')) {
    return NextResponse.redirect(new URL(`/`, url)) // redirect to /login page
  }

  if (
    session.user &&
    !getRoutePermission(
      session.user?.roles,
      (nextUrl.pathname + nextUrl.search) as any,
    ) &&
    nextUrl.pathname !== '/not-allowed'
  ) {
    return NextResponse.redirect(new URL('/not-allowed', url))
  }

  return res
}
