import axios from 'axios'

export const fetcher = (token = process.env['NX_API_TOKEN']) => {
  // Create instance
  const instance = axios.create({
    baseURL: process.env['NX_API_URL'],
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return instance
}
