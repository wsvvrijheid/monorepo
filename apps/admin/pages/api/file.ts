import { NextApiResponse, NextApiRequest } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(req.body)
      .then(res => res.blob())
      .then(blob => {
        // const file = new File([blob], 'image', { type: blob.type })
        console.log('backed image', blob)
        return blob
      })

    return res.send(response)
  } catch (error) {
    console.log('Error in File', error)
    res.send(null)
  }
}

export default handler
