import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

import { getSecret } from '@wsvvrijheid/secrets'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await axios({
    url: `https://api-free.deepl.com/v2/translate?text=${
      req.body.text
    }&target_lang=${req.body.locale.toUpperCase()}`,
    method: 'POST',

    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `DeepL-Auth-Key ${getSecret('DEEPL_API_KEY')}`,
    },
  })

  const text = response.data.translations[0].text
  res.json(text)
}
