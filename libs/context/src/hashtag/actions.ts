import axios from 'axios'
import { UserV1 } from 'twitter-api-v2'

import { API_URL } from '@wsvvrijheid/config'
import { TOKEN } from '@wsvvrijheid/secrets'

export const searchMentions = async (value: string) => {
  const response = await axios(`${API_URL}/api/mentions/search?q=${value}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })
  const rawData = response.data as UserV1[]

  return rawData.sort((a, b) => b.followers_count - a.followers_count)
}
