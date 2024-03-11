import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

import cors from '@fc/lib/src/cors'

export const hashtagSentencesRouter = async (req: NextRequest) => {
  const method = req.method
  try {
    if (method === 'POST') {
      try {
        const { hashtagId, value } = await req.json()

        const response = await kv.rpush(`hashtag:${hashtagId}`, value)

        return cors(req, NextResponse.json(response))
      } catch (error) {
        console.error('Create sentence error', error)
        throw error
      }
    }

    if (method === 'PUT') {
      try {
        const { hashtagId, value, index } = await req.json()

        const response = await kv.lset(`hashtag:${hashtagId}`, index, value)

        return cors(req, NextResponse.json(response))
      } catch (error) {
        console.error('Update sentence error', error)
        throw error
      }
    }

    if (method === 'DELETE') {
      try {
        const hashtagId = req.nextUrl.searchParams.get('hashtagId')?.toString()
        const value = req.nextUrl.searchParams.get('value')?.toString()

        const result = await kv.lrem(`hashtag:${hashtagId}`, 0, value)

        return cors(req, NextResponse.json(result))
      } catch (error) {
        console.error('Delete sentence error', error)
        throw error
      }
    }

    const hashtagId = req.nextUrl.searchParams.get('hashtagId')?.toString()

    const result = await kv.lrange(`hashtag:${hashtagId}`, 0, -1)

    return cors(req, NextResponse.json(result))
  } catch (error: any) {
    return cors(req, NextResponse.json({ error: error.message }))
  }
}
