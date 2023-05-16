import kv from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

const handler = async (req: NextRequest) => {
  const method = req.method

  try {
    if (method === 'POST') {
      const { id, value } = await req.json()

      const response = await kv.rpush(`post_${id}`, value)

      return NextResponse.json(response)
    }

    if (method === 'PUT') {
      const { id, value, index } = await req.json()

      const response = await kv.lset(`post_${id}`, index, value)

      return NextResponse.json(response)
    }

    if (method === 'DELETE') {
      const id = req.nextUrl.searchParams.get('id').toString()
      const value = req.nextUrl.searchParams.get('value').toString()

      const result = await kv.lrem(`post_${id}`, 0, value)

      return NextResponse.json(result)
    }

    const id = req.nextUrl.searchParams.get('id').toString()

    const result = await kv.lrange(`post_${id}`, 0, -1)

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.error()
  }
}

export default handler
