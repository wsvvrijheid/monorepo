import { DEEPL_API_KEY } from '@wsvvrijheid/config'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await axios({
    url: `https://api-free.deepl.com/v2/translate?text=${
      req.body.text
    }&target_lang=${req.body.locale.toUpperCase()}&tag_handling=xml`,
    method: 'POST',

    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
    },
  })

  const text = response.data.translations[0].text
  res.json(text)
}

export default handler
