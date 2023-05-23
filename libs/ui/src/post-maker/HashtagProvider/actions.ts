import axios from 'axios'

import { API_URL } from '@wsvvrijheid/config'
import { TOKEN } from '@wsvvrijheid/secrets'
import { MentionUserData } from '@wsvvrijheid/types'

export const searchMentions = async (value: string) => {
  const response = await axios<MentionUserData[]>(
    `${API_URL}/api/mentions/search?q=${value}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  )
  const rawData = response.data

  return rawData.sort((a, b) => b.followers_count - a.followers_count)
}
