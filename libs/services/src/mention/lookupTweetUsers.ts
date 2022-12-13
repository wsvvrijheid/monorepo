import { API_URL } from '@wsvvrijheid/config'
import { TweetUserData } from '@wsvvrijheid/types'
import axios from 'axios'

export const lookupTwitterUsers = async (
  value: string,
): Promise<TweetUserData[]> => {
  const response = await axios(`${API_URL}/mentions/search?username=${value}`)
  const rawData = response.data as TweetUserData[]
  return rawData.sort((a, b) => b.followers_count - a.followers_count)
}
