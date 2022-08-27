import { API_URL, TOKEN } from '@wsvvrijheid/config'
import axios from 'axios'

export const fetcher = (token = TOKEN) => {
  // Create instance
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return instance
}
