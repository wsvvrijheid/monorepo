import kv from '@vercel/kv'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method

  if (method === 'POST') {
    const result = await kv.rpush('postExample', req.body)

    return res.status(200).json({ result })
  }

  if (method === 'PUT') {
    const result = await kv.lset('postExample', req.body.index, req.body.value)

    return res.status(200).json({ result })
  }

  if (method === 'DELETE') {
    const result = await kv.lrem('postExample', 0, req.body.value)

    return res.status(200).json({ result })
  }

  try {
    const result = await kv.lrange('postExample', 0, -1)

    return res.status(200).json({ result })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export default handler
