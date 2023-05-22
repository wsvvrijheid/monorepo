import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

const handler = async (req: NextRequest) => {
  const method = req.method

  try {
    if (method === 'POST') {
      try {
        const { id, value } = await req.json()

        const response = await kv.rpush(`post_${id}`, value)

        return NextResponse.json(response)
      } catch (error) {
        console.log(error)
        throw error
      }
    }

    if (method === 'PUT') {
      try {
        const { id, value, index } = await req.json()

        const response = await kv.lset(`post_${id}`, index, value)

        return NextResponse.json(response)
      } catch (error) {
        console.log(error)
        throw error
      }
    }

    if (method === 'DELETE') {
      try {
        const id = req.nextUrl.searchParams.get('id').toString()
        const value = req.nextUrl.searchParams.get('value').toString()

        const result = await kv.lrem(`post_${id}`, 0, value)

        return NextResponse.json(result)
      } catch (error) {
        console.log(error)
        throw error
      }
    }

    const id = req.nextUrl.searchParams.get('id').toString()

    const result = await kv.lrange(`post_${id}`, 0, -1)

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: error.message })
  }
}

export default handler
