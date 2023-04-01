import axios from 'axios'
import { UserV1 } from 'twitter-api-v2'

import { API_URL } from '@wsvvrijheid/config'

export const lookupTwitterUsers = async (value: string): Promise<UserV1[]> => {
  const response = await axios(`${API_URL}/mentions/search?username=${value}`)
  const rawData = response.data as UserV1[]
  return rawData.sort((a, b) => b.followers_count - a.followers_count)
}
