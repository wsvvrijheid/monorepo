import axios from 'axios'

import { API_URL } from '@wsvvrijheid/config'
import { MentionUserData } from '@wsvvrijheid/types'

export const lookupTwitterUsers = async (
  value: string,
): Promise<MentionUserData[]> => {
  const response = await axios(`${API_URL}/mentions/search?q=${value}`)
  const rawData = response.data as MentionUserData[]

  return rawData.sort((a, b) => b.followers_count - a.followers_count)
}
