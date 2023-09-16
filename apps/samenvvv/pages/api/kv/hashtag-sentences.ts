import { kv } from '@vercel/kv'
import { unsealData } from 'iron-session/edge'
import { NextRequest, NextResponse } from 'next/server'

import { sessionOptions } from '@wsvvrijheid/secrets'
import { Auth, RoleType } from '@wsvvrijheid/types'

export const config = {
  runtime: 'edge',
}

const handler = async (req: NextRequest) => {
  const method = req.method
  try {
    // Allow users to read the data without authentication
    // but require admin role for all other mutations
    if (method !== 'GET') {
      const { user } = await unsealData<Auth>(
        req.cookies.get('iron-session')?.value as string,
        { password: sessionOptions.password },
      )

      const allowedRoles: RoleType[] = ['admin', 'contentmanager']
      const isAllowed = user?.roles?.some(role => allowedRoles.includes(role))

      if (!isAllowed) {
        throw new Error('Unauthorized')
      }
    }

    if (method === 'POST') {
      try {
        const { hashtagId, value } = await req.json()

        const response = await kv.rpush(`hashtag:${hashtagId}`, value)

        return NextResponse.json(response)
      } catch (error) {
        console.log(error)
        throw error
      }
    }

    if (method === 'PUT') {
      try {
        const { hashtagId, value, index } = await req.json()

        const response = await kv.lset(`hashtag:${hashtagId}`, index, value)

        return NextResponse.json(response)
      } catch (error) {
        console.log(error)
        throw error
      }
    }

    if (method === 'DELETE') {
      try {
        const hashtagId = req.nextUrl.searchParams.get('hashtagId')?.toString()
        const value = req.nextUrl.searchParams.get('value')?.toString()

        const result = await kv.lrem(`hashtag:${hashtagId}`, 0, value)

        return NextResponse.json(result)
      } catch (error) {
        console.log(error)
        throw error
      }
    }

    const hashtagId = req.nextUrl.searchParams.get('hashtagId')?.toString()

    const result = await kv.lrange(`hashtag:${hashtagId}`, 0, -1)

    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}

export default handler
