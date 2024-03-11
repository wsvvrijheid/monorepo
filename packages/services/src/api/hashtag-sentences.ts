import { kv } from '@vercel/kv'
import { NextRequest } from 'next/server'

export const hashtagSentencesRouter = async (req: NextRequest) => {
  const method = req.method
  try {
    if (method === 'POST') {
      try {
        const { hashtagId, value } = await req.json()

        const response = await kv.rpush(`hashtag:${hashtagId}`, value)

        return new Response(JSON.stringify(response))
      } catch (error) {
        console.error('Create sentence error', error)
        throw error
      }
    }

    if (method === 'PUT') {
      try {
        const { hashtagId, value, index } = await req.json()

        const response = await kv.lset(`hashtag:${hashtagId}`, index, value)

        return new Response(JSON.stringify(response))
      } catch (error) {
        console.error('Update sentence error', error)
        throw error
      }
    }

    if (method === 'DELETE') {
      try {
        const hashtagId = req.nextUrl.searchParams.get('hashtagId')?.toString()
        const value = req.nextUrl.searchParams.get('value')?.toString()

        const response = await kv.lrem(`hashtag:${hashtagId}`, 0, value)

        return new Response(JSON.stringify(response))
      } catch (error) {
        console.error('Delete sentence error', error)
        throw error
      }
    }

    const hashtagId = req.nextUrl.searchParams.get('hashtagId')?.toString()

    const response = await kv.lrange(`hashtag:${hashtagId}`, 0, -1)

    return new Response(JSON.stringify(response))
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.status || 500,
    })
  }
}
